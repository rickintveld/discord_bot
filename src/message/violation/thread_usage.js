import config from "../../../config.json" assert { type: "json" };
import thread_violation_repository from "../../repository/thread_violation_repository.js";
import guild_repository from "../../repository/guild_repository.js";
import has_attachments from "../../utilities/has_attachments.js";
import contains_url from "../../utilities/contains_url.js";
import is_bot from "../../utilities/is_bot.js";
import is_admin from "../../utilities/is_admin.js";

import { Events, MessageType } from "discord.js";

const thread_usage = async (client) => {
  client.on(Events.MessageCreate, async (message) => {
    if (is_channel_allowed(message)) return false;
    if (is_bot(message)) return false;
    if (is_message_type_allowed(message)) return false;
    if (has_attachments(message) || contains_url(message)) {
      return false;
    }

    const username = message.author.username;
    const user_id = message.author.id;

    console.log(`Adding ${username} to the thread_usage violators`);

    const user = await thread_violation_repository.fetch(user_id);
    let strike = user?.strike ?? 0;

    let replyMessage = "Please use threads :innocent:";

    switch (strike) {
      case 1:
        replyMessage = "Please use threads :angry:";
        await thread_violation_repository.update(user_id);
        break;
      case 2:
        replyMessage = "Please use threads :rage:";
        await thread_violation_repository.update(user_id);
        break;
      default:
        await thread_violation_repository.add(user_id, username, 1);
    }

    if (strike > 2) {
      const member = await message.guild.members.fetch(user_id);

      if (is_admin(member)) return false;

      await message.reply(
        `${username} received a 10 seconde timeout for not using threads!`
      );
      await guild_repository.timeout(member, "Timeout for not using threads");
    } else {
      await message.reply(replyMessage);
    }
  });
};

const is_channel_allowed = (message) => {
  return ![
    config.channels.setups,
    config.channels.winners,
    config.channels.market_outlook,
  ].includes(Number(message.channelId));
};

const is_message_type_allowed = (message) => {
  return [MessageType.ThreadCreated, MessageType.ThreadStarterMessage].includes(
    message.type
  );
};

export default thread_usage;
