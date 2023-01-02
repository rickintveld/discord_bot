import { SlashCommandBuilder } from "discord.js";
import lurker_repository from "../../repository/lurker_repository.js";
import guild_repository from "../../repository/guild_repository.js";
import config from "../../../config.json" assert { type: "json" };

const data = new SlashCommandBuilder()
  .setName("inactive_members")
  .setDescription("Posts a list of inactive members")
  .setDefaultMemberPermissions("0")
  .addBooleanOption((option) =>
    option
      .setName("revoke_role")
      .setDescription("The amount of messages sent")
      .setRequired(false)
  );

const execute = async (client, interaction) => {
  const lurkers = await lurker_repository.fetchAll();
  const revoke_role = interaction.options.getBoolean("revoke_role", false);

  if (lurkers === null) {
    interaction.reply("The group has 0 inactive members 🔥");
  }

  const guild = await client.guilds.fetch(config.guildId);
  const message = ["⚠️ **Inactive member(s) alert** ⚠️", " "];

  for (const lurker of lurkers) {
    const member = await guild.members.fetch(lurker.user_id);
    const date = new Date(member.joinedTimestamp);

    if (revoke_role) {
      guild_repository.revoke_roles(member);
    }

    message.push(
      `${member.toString()} joined at ${date.getDate()}-${date.getMonth()}-${date.getFullYear()} and has sent ${
        lurker.messages
      } message(s)`
    );
  }

  if (revoke_role) {
    message.push(" ");
    message.push(
      "*Your role will be revoked and the bot will remove you from the server on the next clean up round.*"
    );
  }

  interaction.reply(message.join("\n"));
};

const inactive_members = { data, execute };

export default inactive_members;
