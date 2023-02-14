import { SlashCommandBuilder, EmbedBuilder, Colors } from "discord.js";
import webinar_repository from "../../repository/webinar_repository.js";
import bot_action_repository from "../../repository/guild/bot_action_repository.js";

const data = new SlashCommandBuilder()
  .setName("new-webinar")
  .setDescription("Adds a new webinar")
  .addIntegerOption((option) =>
    option
      .setName("webinar")
      .setDescription("The webinar number")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option.setName("url").setDescription("The webinar url").setRequired(true)
  );

const execute = async (client, interaction) => {
  const webinar_number = interaction.options.getInteger("webinar", true);
  const webinar_url = interaction.options.getString("url", true);

  const webinar = await webinar_repository.fetch(webinar_number);

  if (webinar) {
    bot_action_repository.log(
      client,
      `Webinar ${webinar_number} already exists`,
      true
    );

    return;
  }

  await webinar_repository.add(webinar_number, webinar_url);

  const embed_message = new EmbedBuilder();
  const description = `Webinar ${webinar_number} added to the database`;
  embed_message.setColor(Colors.Green);
  embed_message.setDescription(description);

  bot_action_repository.log(client, description, false);

  interaction.reply({ embeds: [embed_message] });
};

const new_webinar = { data, execute };

export default new_webinar;
