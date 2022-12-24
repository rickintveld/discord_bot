import { SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
  .setName("live_trading_poll")
  .setDescription("Returns a poll for a live trading session")
  .addUserOption((option) =>
    option
      .setName("user")
      .setDescription("The user which will have to do the live trading session")
      .setRequired(true)
  );

const execute = async (client, interaction) => {
  const user = interaction.options.getUser("user", true);
  const message = [
    `**Which day do you want ${user.toString()} to do a live trading session for the upcoming week?**`,
    "*New York session only; 13:00 +0 GMT*",
    " ",
    "1️⃣ Monday",
    "2️⃣ Tuesday",
    "3️⃣ Wednesday",
    "4️⃣ Thursday",
    "5️⃣ Friday",
    " ",
    "> Respond with 1 of the letters so I can count the choices",
  ];
  const reponse = await interaction.reply({
    content: message.join("\n"),
    fetchReply: true,
  });
  const icons = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"];
  for (const icon of icons) {
    reponse.react(icon);
  }
};

const live_trading = { data, execute };

export default live_trading;
