import config from "../../../config.json" assert { type: "json" };
import { EmbedBuilder, Events, Colors } from "discord.js";
import bot_action_repository from "../../repository/guild/bot_action_repository.js";
import channel_repository from "../../repository/guild/channel_repository.js";
import role_mapping from "../../utilities/role_mapping.js";

const introduction_submit = async (client) => {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (
      interaction.isModalSubmit() &&
      interaction.customId === "introduction_modal"
    ) {
      const guild = await client.guilds.fetch(config.guildId);
      const member = await guild.members.fetch(interaction.user.id);
      const channel = await channel_repository.journey(client);

      const name = interaction.fields.getTextInputValue("nameInput");
      const experience =
        interaction.fields.getTextInputValue("experienceInput");
      const funding = interaction.fields.getTextInputValue("fundingInput");
      const instruments =
        interaction.fields.getTextInputValue("instrumentsInput");
      const journeyStage =
        interaction.fields.getTextInputValue("journeyStageInput");

      let role = null;

      try {
        role = await guild.roles.fetch(
          role_mapping.role_id_map(Number(journeyStage))
        );
        member._roles.forEach((role) => {
          if (role_mapping.has_role(role) || role_mapping.is_new_member(role)) {
            member.roles.remove(role);
          }
        });
        member.roles.add(role);
      } catch (e) {
        const error_message = new EmbedBuilder()
          .setDescription(`${e.message}, please try again!`)
          .setColor(Colors.Red);

        await interaction.reply({ embeds: [error_message] });

        return;
      }

      const introduction_message = [
        `Hello everyone! 👋`,
        "We have got a new member 🔥",
        "",
        `His/Her name is: ${member.toString()}`,
        `Time in trading: ${experience}`,
        `Instruments: ${instruments}`,
        `Funding: ${funding}`,
        `Journey stage: ${role.toString()}`,
      ];

      await channel.send(introduction_message.join("\n"));

      const embed_message = new EmbedBuilder()
        .setDescription(`Welcome ${interaction.user.toString()}!`)
        .setColor(Colors.Green);

      await interaction.reply({ embeds: [embed_message] });
    }
  });
};

export default introduction_submit;
