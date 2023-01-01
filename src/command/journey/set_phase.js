import { SlashCommandBuilder } from "discord.js";
import config from "../../../config.json" assert { type: "json" };
import role_mapping from "../../utilities/role_mapping.js";

const data = new SlashCommandBuilder()
  .setName("set_journey_phase")
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

  interaction.reply(
    `${user.toString()} is set to journey phase ${role.toString()} 🔥`
  );
};

const set_phase = { data, execute };

export default set_phase;
