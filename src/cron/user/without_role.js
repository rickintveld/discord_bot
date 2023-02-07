import config from "../../../config.json" assert { type: "json" };
import { dateCompare } from "../../utilities/date_compare.js";
import guild_repository from "../../repository/guild_repository.js";
import lurker_repository from "../../repository/lurker_repository.js";
import cron from "node-cron";
import { EmbedBuilder, Colors } from "discord.js";
import bot_action_repository from "../../repository/bot_action_repository.js";
import channel_repository from "../../repository/channel_repository.js";

const without_role = async (client) => {
  cron.schedule("49 10 * * *", async () => {
    const guild = await client.guilds.fetch(config.guildId);
    const members = await guild.members.fetch();

    const membersWithoutRoles = members
      .filter((member) => member._roles.length === 0)
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

      if (lurker_repository.fetch(member.user.id)) {
        lurker_repository.remove(member.user.id);

        bot_action_repository.log(
          client,
          `${member.user.username} is removed from the lurker database`,
          false
        );
      }
    });
  });
};

export default without_role;
