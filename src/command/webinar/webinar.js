import { SlashCommandBuilder } from "discord.js";
import webinar_repository from "../../repository/webinar_repository.js";

const data = new SlashCommandBuilder()
  .setName("webinar")
  .setDescription("Returns the webinar video")
  .addIntegerOption((option) =>
    option
      .setName("webinar")
      .setDescription("The webinar number")
      .setRequired(true)
  );

const execute = async (client, interaction) => {
  const webinarNumber = interaction.options.getInteger("webinar", true);

  const webinar = await webinar_repository.fetch(webinarNumber);

  interaction.reply(`${webinar.url}`);
};

const fetch_webinar = { data, execute };

export default fetch_webinar;
