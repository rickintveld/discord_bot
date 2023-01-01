import { SlashCommandBuilder } from "discord.js";
import config from "../../../config.json" assert { type: "json" };
import role_mapping from "../../utilities/role_mapping.js";

const data = new SlashCommandBuilder()
  .setName("next_journey_phase")
  .setDescription("Automatically upgrades the member to the next journey stage")
  .addUserOption((option) =>
    option
      .setName("user")
      .setDescription("The user which will receive the role upgrade")
      .setRequired(true)
  )
  .setDefaultMemberPermissions("0");

const execute = async (client, interaction) => {
  const user = interaction.options.getUser("user", true);
  const guild = await client.guilds.fetch(config.guildId);
  const member = await guild.members.fetch(user.id);

  for (const role of member._roles) {
    if (role_mapping.has_role(role)) {
      try {
        const next_role = await guild.roles.fetch(role_mapping.next(role));

        member.roles.add(next_role);
        member.roles.remove(role);

        interaction.reply(
          `${user.toString()} moved up to journey phase ${next_role.toString()} 🔥`
        );
      } catch (e) {
        interaction.reply(e.message);
      }
    }
  }
};

const next_phase = { data, execute };

export default next_phase;
