import config from "../../../config.json" assert { type: "json" };
import { dateCompare } from "../../utilities/date_compare.js";
import guild_repository from "../../repository/guild/guild_repository.js";
import cron from "node-cron";
import { EmbedBuilder, Colors } from "discord.js";
import bot_action_repository from "../../repository/guild/bot_action_repository.js";
import channel_repository from "../../repository/guild/channel_repository.js";
import role_mapping from "../../utilities/role_mapping.js";

const without_role = async (client) => {
  cron.schedule("0 10 * * *", async () => {
    const guild = await client.guilds.fetch(config.guildId);
    const members = await guild.members.fetch();

    const membersWithoutRoles = members
      .filter((member) => member._roles.length === 0)
      .filter((member) => role_mapping.has_new_member_role(member._roles))
      .filter(
        (member) => dateCompare.differenceInDays(member.joinedTimestamp) > 1
      );

    const channel = await channel_repository.general(client);

    membersWithoutRoles.each((member) => {
      const description = `Member ${member.user.username} is kicked from the group for inactivity :wave:`;
      const embed = new EmbedBuilder()
        .setColor(Colors.Red)
        .setDescription(description);

      channel.send({ embeds: [embed] });

      bot_action_repository.log(client, description, false);

      guild_repository.kick(guild, member.user.id);
    });
  });
};

export default without_role;
