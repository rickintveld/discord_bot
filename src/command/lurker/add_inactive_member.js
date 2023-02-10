import { SlashCommandBuilder, EmbedBuilder, Colors } from "discord.js";
import lurker_repository from "../../repository/lurker_repository.js";
import bot_action_repository from "../../repository/guild/bot_action_repository.js";

const data = new SlashCommandBuilder()
  .setName("add_inactive_member")
  .setDescription("Adds a lurker to the database")
  .setDefaultMemberPermissions("0")
  .addUserOption((option) =>
    option
      .setName("user")
      .setDescription("The user which needs to be added to the database")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("messages")
      .setDescription("The amount of messages sent")
      .setRequired(true)
  );

const execute = async (client, interaction) => {
  const user = interaction.options.getUser("user", true);
  const messages = interaction.options.getString("messages", true);

  await lurker_repository.add(user.id, messages);

  const description = `Added ${user.toString()} as a inactive member`;

  const message = new EmbedBuilder()
    .setColor(Colors.Green)
    .setDescription(description);

  interaction.reply({ embeds: [message] });

  bot_action_repository.log(client, description, false);
};

const add_inactive_member = { data, execute };

export default add_inactive_member;
