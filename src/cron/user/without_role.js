import config from "../../../config.json" assert { type: "json" };
import { dateCompare } from "../../utilities/date_compare.js";
import guildRepository from "../../repository/guildRepository.js";
import cron from "node-cron";

const without_role = async (client) => {
  cron.schedule("0 9 * * *", async () => {
    const guild = await client.guilds.fetch(config.guildId);
    const members = await guild.members.fetch();

    const membersWithoutRoles = members
      .filter((member) => member._roles.length === 0)
      .filter(
        (member) => dateCompare.differenceInDays(member.joinedTimestamp) > 2
      );

    const channel = await client.channels.fetch(config.channels.general);

    membersWithoutRoles.each((member) => {
      channel.send(
        `User ${member.user.username} is kicked from the group for inactivity :wave:`
      );
      guildRepository.kick(guild, member.user.id);
    });
  });
};

export default without_role;
