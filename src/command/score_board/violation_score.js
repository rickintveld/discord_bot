import { SlashCommandBuilder } from "discord.js";
import retail_violation_repository from "../../repository/retail_violation_repository.js";
import config from "../../../config.json" assert { type: "json" };

const data = new SlashCommandBuilder()
  .setName("violations_score_board")
  .setDescription(
    "Posts a list of members with the amount of retail violations"
  )
  .setDefaultMemberPermissions("0");

const execute = async (client, interaction) => {
  const date = new Date();
  const month = date.getMonth() + 1 + "-" + date.getFullYear();

  const send_in_violations = await retail_violation_repository.fetchAll();

  if (!send_in_violations) {
    interaction.reply(`No winning setups shared yet for ${month}`);

    return;
  }

  const guild = await client.guilds.fetch(config.guildId);

  const violations = send_in_violations
    .sort((a, b) => a.strike - b.strike)
    .reverse();

  const message = [`**Retail violations leaderboard for ${month}**`, " "];

  for (let index = 0; index < 3; index++) {
    const violation = violations[index];
    const member = await guild.members.fetch(winner.user_id);

    message.push(
      `${icon(index)} ${member.toString()} ${violation.strike} violations`
    );
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

const violation_score = { data, execute };

export default violation_score;
