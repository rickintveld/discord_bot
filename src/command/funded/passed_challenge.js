import { SlashCommandBuilder, EmbedBuilder, Colors } from "discord.js";

const data = new SlashCommandBuilder()
  .setName("passed_challenge")
  .setDescription("Congratz to the member for passing the challenge")
  .addUserOption((option) =>
    option.setName("user").setDescription("The funded user").setRequired(true)
  )
  .addStringOption((option) =>
    option.setName("propfirm").setDescription("The propfirm").setRequired(true)
  );

const execute = async (client, interaction) => {
  const user = interaction.options.getUser("user", true);
  const propfirm = interaction.options.getString("propfirm", true);

  const embed = new EmbedBuilder()
    .setColor(Colors.Green)
    .setDescription(
      `${user.toString()} passed the ${propfirm} challenge 🥂💰 `
    );

  interaction.reply({ embeds: [embed] });
};

const passed_challenge = { data, execute };

export default passed_challenge;
