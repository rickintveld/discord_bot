import { Events, MessageType, EmbedBuilder, Colors } from "discord.js";
import config from "../../../config.json" assert { type: "json" };
import guild_repository from "../../repository/guild/guild_repository.js";
import has_attachments from "../../utilities/has_attachments.js";
import contains_url from "../../utilities/contains_url.js";
import is_bot from "../../utilities/is_bot.js";
import bot_action_repository from "../../repository/guild/bot_action_repository.js";

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

    const embed_message = new EmbedBuilder().setColor(Colors.Red);

    const member = await message.guild.members.fetch(user_id);

    embed_message.setDescription(`${username} Please use threads :innocent:`);
    await message.reply({ embeds: [embed_message] });

    await guild_repository.timeout(member, "Timeout for not using threads");

    bot_action_repository.log(
      client,
      `New violation for not using threads by ${username}`,
      false
    );
  });
};

const is_channel_allowed = (message) => {
  return ![
    config.channels.setups,
    config.channels.winners,
    config.channels.market_outlook,
    config.channels.losses,
  ].includes(Number(message.channelId));
};

const is_message_type_allowed = (message) => {
  return [MessageType.ThreadCreated, MessageType.ThreadStarterMessage].includes(
    message.type
  );
};

export default thread_usage;
