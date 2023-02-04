import { SlashCommandBuilder, EmbedBuilder, Colors } from "discord.js";
import config from "../../../config.json" assert { type: "json" };
import lurker_repository from "../../repository/lurker_repository.js";
import bot_action_repository from "../../repository/bot_action_repository.js";

const data = new SlashCommandBuilder()
  .setName("set_journey_stage")
  .setDescription("Set the journey phase role to the given user")
  .addUserOption((option) =>
    option
      .setName("user")
      .setDescription("The user which will receive the role upgrade")
      .setRequired(true)
  )
  .addRoleOption((option) =>
    option
      .setName("role")
      .setDescription("The role you want to give the user")
      .setRequired(true)
  )
  .setDefaultMemberPermissions("0");

const execute = async (client, interaction) => {
  const user = interaction.options.getUser("user", true);
  const role = interaction.options.getRole("role", true);

  const guild = await client.guilds.fetch(config.guildId);
  const member = await guild.members.fetch(user.id);

  member._roles.forEach((role) => {
    member.roles.remove(role);
  });

  member.roles.add(role);

  if (lurker_repository.fetch(member.user.id)) {
    lurker_repository.remove(member.user.id);
  }

  const description = `${user.toString()} has been given journey stage role ${role.toString()}`;

  const message = new EmbedBuilder()
    .setColor(Colors.Green)
    .setDescription(description);

  interaction.reply({ embeds: [message] });

  bot_action_repository.log(client, description, false);
};

const set_stage = { data, execute };

export default set_stage;
