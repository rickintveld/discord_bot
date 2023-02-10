import { SlashCommandBuilder, EmbedBuilder, Colors } from "discord.js";
import bot_action_repository from "../../repository/guild/bot_action_repository.js";
import profit_api_repository from "../../repository/api/profit_api_repository.js";

const data = new SlashCommandBuilder()
  .setName("profit")
  .setDescription("New profit")
  .addNumberOption((option) =>
    option.setName("profit").setDescription("The profit").setRequired(true)
  )
  .setDefaultMemberPermissions("0");

const execute = async (client, interaction) => {
  const profit = interaction.options.getNumber("profit", true);

  const description = `Added $ ${profit} to your account`;

  const embed = new EmbedBuilder()
    .setColor(Colors.Green)
    .setDescription(description);

  interaction.reply({ embeds: [embed], ephemeral: true });

  bot_action_repository.log(client, description, false);

  try {
    await profit_api_repository.add({
      user_id: interaction.user.id,
      profit: profit,
    });
  } catch (e) {
    bot_action_repository.log(client, e.message, true);
  }
};

const profit = { data, execute };

export default profit;
