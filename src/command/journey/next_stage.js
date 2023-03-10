import { SlashCommandBuilder, EmbedBuilder, Colors } from "discord.js";
import config from "../../../config.json" assert { type: "json" };
import role_mapping from "../../utilities/role_mapping.js";
import bot_action_repository from "../../repository/guild/bot_action_repository.js";

const data = new SlashCommandBuilder()
  .setName("next_journey_stage")
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

        const description = `${user.toString()} moved up to journey stage ${next_role.toString()}`;

        const message = new EmbedBuilder()
          .setColor(Colors.Green)
          .setDescription(description);

        interaction.reply({ embeds: [message] });

        bot_action_repository.log(client, description, false);
      } catch (e) {
        const error_message = new EmbedBuilder()
          .setColor(Colors.Red)
          .setDescription(e.message);
        interaction.reply({ embeds: [error_message] });

        bot_action_repository.log(client, e.message, true);
      }
    }
  }
};

const next_stage = { data, execute };

export default next_stage;
