const kick = async (guild, userId) => {
  await guild.members
    .kick(userId)
    .then((kickInfo) =>
      console.log(`Kicked ${kickInfo.user?.tag ?? kickInfo.tag ?? kickInfo}`)
    )
    .catch(console.error);
};

const timeout = async (member, reason) => {
  await member.timeout(10 * 1000, reason);
};

const guildRepository = {
  kick,
  timeout,
};

export default guildRepository;
