import { EmbedBuilder, Colors } from "discord.js";
import channel_repository from "./channel_repository.js";

const log = async (client, message, error) => {
  const channel = await channel_repository.log(client);

  const embed_message = new EmbedBuilder()
    .setColor(error ? Colors.Red : Colors.Green)
    .setDescription(message);

  channel.send({ embeds: [embed_message] });
};

const bot_action_repository = { log };

export default bot_action_repository;
