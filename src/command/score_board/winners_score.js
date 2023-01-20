import { SlashCommandBuilder } from "discord.js";
import winner_repository from "../../repository/winner_repository.js";
import config from "../../../config.json" assert { type: "json" };

const data = new SlashCommandBuilder()
  .setName("winners_score_board")
  .setDescription(
    "Posts a list of members with the amount of send in winning trades"
  )
  .setDefaultMemberPermissions("0");

const execute = async (client, interaction) => {
  const date = new Date();
  const month = date.getMonth() + 1 + "-" + date.getFullYear();

  const all_winners = await winner_repository.fetchAll();

  if (!all_winners) {
    interaction.reply(`No winning setups shared yet for ${month}`);

    return;
  }

  const guild = await client.guilds.fetch(config.guildId);

  const winners = all_winners.sort((a, b) => a.wins - b.wins).reverse();

  const message = [`**Trade winners leaderboard for ${month}**`, " "];

  for (let index = 0; index < 3; index++) {
    const winner = winners[index];
    const member = await guild.members.fetch(winner.user_id);

    message.push(`${icon(index)} ${member.toString()} ${winner.wins} winners`);
  }

  interaction.reply(message.join("\n"));
};

const icon = (i) => {
  if (i === 0) {
    return "🥇";
  } else if (i === 1) {
    return "🥈";
  }

  return "🥉";
};

const winners_score = { data, execute };

export default winners_score;
