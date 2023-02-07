import { SlashCommandBuilder, EmbedBuilder, Colors } from "discord.js";
import webinar_repository from "../../repository/webinar_repository.js";
import bot_action_repository from "../../repository/bot_action_repository.js";

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

  const embed_message = new EmbedBuilder();

  if (webinar) {
    bot_action_repository.log(
      client,
      `Webinar ${webinarNumber} is requested by ${interaction.user.username}`,
      false
    );

    interaction.reply(webinar.url);

    return;
  }
  const description = `Requested webinar ${webinarNumber} can not be found`;
  embed_message.setColor(Colors.Red);
  embed_message.setDescription(description);

  bot_action_repository.log(
    client,
    `Unknown webinar ${webinarNumber} is requested by ${interaction.user.username}`,
    true
  );

  interaction.reply({ embeds: [embed_message] });
};

const fetch_webinar = { data, execute };

export default fetch_webinar;
