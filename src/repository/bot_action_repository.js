import config from "../../config.json" assert { type: "json" };
import { EmbedBuilder, Colors } from "discord.js";

const log = async (client, message, error) => {
  const channel = await client.channels.fetch(config.channels.bot.log);
  const embed_message = new EmbedBuilder()
    .setColor(error ? Colors.Red : Colors.Green)
    .setDescription(message);

  channel.send({ embeds: [embed_message] });
};

const bot_action_repository = { log };

export default bot_action_repository;
