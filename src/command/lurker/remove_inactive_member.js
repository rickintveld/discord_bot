import { SlashCommandBuilder, EmbedBuilder, Colors } from "discord.js";
import lurker_repository from "../../repository/lurker_repository.js";

const data = new SlashCommandBuilder()
  .setName("remove_inactive_member")
  .setDescription("Removes a lurker from the database")
  .setDefaultMemberPermissions("0")
  .addUserOption((option) =>
    option
      .setName("user")
      .setDescription(
        "The lurking user which needs to be removed from the database"
      )
      .setRequired(true)
  );

const execute = async (client, interaction) => {
  const user = interaction.options.getUser("user", true);

  await lurker_repository.remove(user.id);

  const message = new EmbedBuilder()
    .setColor(Colors.Green)
    .setDescription(
      `Removed ${user.toString()} from the list of inactive members`
    );

  interaction.reply({ embeds: [message] });
};

const remove_inactive_member = { data, execute };

export default remove_inactive_member;
