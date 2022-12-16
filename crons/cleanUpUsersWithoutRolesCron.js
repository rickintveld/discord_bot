import config from "../config.json" assert { type: "json" };
import { dateCompare } from "../utils/dateCompare.js";
import guildRepository from "../repository/guildRepository.js";

const cleanUpUsersWithoutRolesCron = async (client) => {
  const guild = await client.guilds.fetch(config.guildId);
  const members = await guild.members.fetch();

  const membersWithoutRoles = members
    .filter((member) => member._roles.length === 0)
    .filter(
      (member) => dateCompare.differenceInDays(member.joinedTimestamp) > 2
    );

  const channel = await client.channels.fetch(config.channels.general);

  membersWithoutRoles.each((member) => {
    if (channel) {
      channel.send(
        `User ${member.user.username} is kicked from the group for inactivity :wave:`
      );
    }
    guildRepository.kick(guild, member.user.id);
  });
};

export default cleanUpUsersWithoutRolesCron;
