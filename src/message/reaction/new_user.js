import config from "../../../config.json" assert { type: "json" };
import { Events } from "discord.js";

const new_user = async (client) => {
  client.on(Events.GuildMemberAdd, async (member) => {
    const channel = await member.guild.channels.fetch(
      config.channels.new_member
    );
    const rulesChannel = await member.guild.channels.fetch(
      config.channels.rules
    );

    const message = [
      `Welcome ${member.toString()}!`,
      `Please checkout our server rules in the ${rulesChannel.toString()} channel`,
    ];

    channel.send(message.join("\n"));
  });
};

export default new_user;
