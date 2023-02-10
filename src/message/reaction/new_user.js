import config from "../../../config.json" assert { type: "json" };
import { Events } from "discord.js";
import lurker_repository from "../../repository/lurker_repository.js";
import bot_action_repository from "../../repository/guild/bot_action_repository.js";

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

    lurker_repository.add(member.user.id, "New member");

    bot_action_repository.log(
      client,
      `New member added to the lurker database`,
      false
    );

    channel.send(message.join("\n"));
  });
};

export default new_user;
