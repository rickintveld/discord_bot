import config from "../../../config.json" assert { type: "json" };
import setupViolationRepository from "../../repository/setupViolationRepository.js";
import guildRepository from "../../repository/guildRepository.js";
import has_attachments from "../../utilities/has_attachments.js";
import contains_url from "../../utilities/contains_url.js";
import is_bot from "../../utilities/is_bot.js";

import { MessageType } from "discord.js";

const setup_thread_usage = async (client) => {
  client.on("messageCreate", async (message) => {
    const channelId = message.channelId;
    if (Number(channelId) !== config.channels.setups) return false;
    if (is_bot(message)) return false;
    if (
      [MessageType.ThreadCreated, MessageType.ThreadStarterMessage].includes(
        message.type
      )
    ) {
      return false;
    }

    if (has_attachments(message) || contains_url(message)) {
      return false;
    }

    const username = message.author.username;
    const user_id = message.author.id;

    console.log(`Adding ${username} to the setup_thread_usage violators`);

    const user = await setupViolationRepository.fetch(user_id);
    let strike = user?.strike ?? 0;

    let replyMessage =
      "Please use threads for discussion or questions about setups :innocent:";

    switch (strike) {
      case 1:
        replyMessage =
          "Please use threads for discussion or questions about setups :angry:";
        await setupViolationRepository.update(user_id);
        break;
      case 2:
        replyMessage = `I'm watching you ${username}, last warning, use threads :warning:`;
        await setupViolationRepository.update(user_id);
        break;
      case 3:
        replyMessage = `Yoo ${username}, use THREADS. Timeout incoming :wave:`;
        await setupViolationRepository.remove(user_id);
        break;
      default:
        await setupViolationRepository.add(user_id, username, 1);
    }

    if (strike === 3) {
      const member = await message.guild.members.fetch(user_id);

      if (Number(member.user.discriminator) === config.admin.discriminator) {
        return false;
      }

      await message.reply(
        `${username} received a 10 seconde timeout for not using threads!`
      );
      await guildRepository.timeout(member, "Timeout for not using threads");
    } else {
      await message.reply(replyMessage);
    }
  });
};

export default setup_thread_usage;
