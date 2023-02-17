import config from "../../../config.json" assert { type: "json" };
import {
  Events,
  EmbedBuilder,
  Colors,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";
import lurker_repository from "../../repository/lurker_repository.js";
import role_mapping from "../../utilities/role_mapping.js";
import bot_action_repository from "../../repository/guild/bot_action_repository.js";

const new_user = async (client) => {
  client.on(Events.GuildMemberAdd, async (member) => {
    const channel = await member.guild.channels.fetch(
      config.channels.new_member
    );
    const rulesChannel = await member.guild.channels.fetch(
      config.channels.rules
    );

    member.roles.add(role_mapping.new_member);

    const embed_message = new EmbedBuilder()
      .setColor(Colors.Blue)
      .setTitle(`Welcome ${member.toString()}!`)
      .setDescription(
        `Please checkout our server rules in the ${rulesChannel.toString()} channel and do a proper introduction to get access to the rest of the server`
      );

    lurker_repository.add(member.user.id, "New member");

    bot_action_repository.log(
      client,
      `New member added to the lurker database`,
      false
    );

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("introduce_btn")
        .setLabel("Do introduction!")
        .setStyle(ButtonStyle.Primary)
    );

    channel.send({ embeds: [embed_message], components: [row] });
  });
};

export default new_user;
