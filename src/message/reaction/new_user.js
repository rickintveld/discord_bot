import config from "../../../config.json" assert { type: "json" };

const new_user = async (client) => {
  client.on("guildMemberAdd", async (member) => {
    const channel = member.guild.channels.get(config.channels.new_member);
    const rulesChannel = member.guild.channels.get(config.channels.new_member);

    const message = [
      `Welcome ${member.toString()}!`,
      `Please checkout the server rules in the ${rulesChannel.toString()} channel`,
    ];

    channel.send(message.join("/n"));
  });
};

export default new_user;
