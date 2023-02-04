import is_admin from "../utilities/is_admin.js";

const kick = async (guild, userId) => {
  await guild.members
    .kick(userId)
    .then((kickInfo) =>
      console.log(`Kicked ${kickInfo.user?.tag ?? kickInfo.tag ?? kickInfo}`)
    )
    .catch(console.error);
};

const timeout = async (member, reason) => {
  if (is_admin(member)) return false;

  await member.timeout(10 * 1000, reason);
};

const revoke_roles = (member) => {
  for (const role of member._roles) {
    member.roles.remove(role);
  }
};

const guild_repository = {
  kick,
  timeout,
  revoke_roles,
};

export default guild_repository;
