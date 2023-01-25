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

  let response = webinar
    ? webinar.url
    : `Webinar ${webinarNumber} can not be found ⚠️`;

  interaction.reply(response);
};

const fetch_webinar = { data, execute };

export default fetch_webinar;
