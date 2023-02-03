import config from "../../../config.json" assert { type: "json" };
import { dateCompare } from "../../utilities/date_compare.js";
import guild_repository from "../../repository/guild_repository.js";
import lurker_repository from "../../repository/lurker_repository.js";
import cron from "node-cron";
import { EmbedBuilder, Colors } from "discord.js";

const without_role = async (client) => {
  cron.schedule("49 10 * * *", async () => {
    const guild = await client.guilds.fetch(config.guildId);
    const members = await guild.members.fetch();

    const membersWithoutRoles = members
      .filter((member) => member._roles.length === 0)
      .filter(
        (member) => dateCompare.differenceInDays(member.joinedTimestamp) > 1
      );

    const channel = await client.channels.fetch(config.channels.general);

    membersWithoutRoles.each((member) => {
      const embed = new EmbedBuilder()
        .setColor(Colors.Red)
        .setDescription(
          `Member ${member.user.username} is kicked from the group for inactivity :wave:`
        );

      channel.send({ embeds: [embed] });

      guild_repository.kick(guild, member.user.id);

      if (lurker_repository.fetch(member.user.id)) {
        lurker_repository.remove(member.user.id);
      }
    });
  });
};

export default without_role;
