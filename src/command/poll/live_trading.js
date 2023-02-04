import { SlashCommandBuilder } from "discord.js";
import bot_action_repository from "../../repository/bot_action_repository.js";

const data = new SlashCommandBuilder()
  .setName("live_trading_poll")
  .setDescription("Returns a poll for a live trading session")
  .addUserOption((option) =>
    option
      .setName("user")
      .setDescription("The user which will have to do the live trading session")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("session")
      .setDescription("The session for the live trading")
      .setRequired(true)
      .addChoices(
        { name: "london", value: "London" },
        { name: "new_york", value: "New York" },
        { name: "tokyo", value: "Tokyo" },
        { name: "sydney", value: "Sydney" }
      )
  );
// .setDefaultMemberPermissions("0");

const execute = async (client, interaction) => {
  const user = interaction.options.getUser("user", true);
  const session = interaction.options.getString("session", true);

  const message = [
    `**Which day do you want ${user.toString()} to do a live trading session for the upcoming week?**`,
    `*${session} session* 🕑`,
    " ",
    "1️⃣ Monday",
    "2️⃣ Tuesday",
    "3️⃣ Wednesday",
    "4️⃣ Thursday",
    "5️⃣ Friday",
    " ",
    "> Respond with 1 of the letters so I can count the choices and decide when to do the live trading session.",
  ];
  const reponse = await interaction.reply({
    content: message.join("\n"),
    fetchReply: true,
  });
  const icons = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"];
  for (const icon of icons) {
    reponse.react(icon);
  }

  bot_action_repository.log(
    client,
    `A live trading session is requested by ${interaction.user.toString()}`,
    false
  );
};

const live_trading = { data, execute };

export default live_trading;
