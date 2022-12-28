import { SlashCommandBuilder } from "discord.js";

const prices = [
  { name: "5k", value: "5k challenge" },
  { name: "10k", value: "10k challenge" },
  { name: "20k", value: "20k challenge" },
];

const data = new SlashCommandBuilder()
  .setName("winner")
  .setDescription("Congratulate the winners")
  .addUserOption((option) =>
    option
      .setName("winner")
      .setDescription("The user who won the competition")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("winner_price")
      .setDescription("The winners price")
      .setRequired(true)
      .addChoices(...prices)
  )
  .addUserOption((option) =>
    option
      .setName("runner_up")
      .setDescription("The user who became runner up of the competition")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("runner_up_price")
      .setDescription("The session for the live trading")
      .setRequired(true)
      .addChoices(...prices)
  )
  .setDefaultMemberPermissions("0");

const execute = async (client, interaction) => {
  const winner = interaction.options.getUser("winner", true);
  const winner_price = interaction.options.getString("winner_price", true);
  const runner_up = interaction.options.getUser("runner_up", true);
  const runner_up_price = interaction.options.getString(
    "runner_up_price",
    true
  );

  const message = [
    "**Congratulations to the winners of the trading competition** 🥂",
    " ",
    `🥇 1st place: ${winner.toString()} - ${winner_price}`,
    `🥈 2nd place: ${runner_up.toString()} - ${runner_up_price}`,
    " ",
    "> Contact me through a DM so we can arrange the payment for the challenge 💰",
  ];

  interaction.reply(message.join("\n"));
};

const live_trading = { data, execute };

export default live_trading;
