import config from "../../../config.json" assert { type: "json" };
import cron from "node-cron";
import leader_board_service from "../../service/leader_board_service.js";
import channel_repository from "../../repository/channel_repository.js";
import bot_action_repository from "../../repository/bot_action_repository.js";

const top_three = async (client) => {
  cron.schedule("0 9 1 * *", async () => {
    const channel = await channel_repository.general(client);
    const guild = await client.guilds.fetch(config.guildId);

    try {
      const winners = await leader_board_service.trade.winners();

      channel.send(map_winner_message(winners, guild));
    } catch (e) {
      bot_action_repository.log(client, e.message, false);
    }

    try {
      const thread_violations =
        await leader_board_service.violations.thread_violations();

      channel.send(map_thread_message(thread_violations, guild));
    } catch (e) {
      bot_action_repository.log(client, e.message, false);
    }

    try {
      const retail_violations =
        await leader_board_service.violations.retail_violations();

      channel.send(map_retail_message(retail_violations, guild));
    } catch (e) {
      bot_action_repository.log(client, e.message, false);
    }

    await leader_board_service.data.clean_up();
  });
};

const map_winner_message = async (winners, guild) => {
  const date = new Date();
  const month = date.getMonth() + "-" + date.getFullYear();

  const message = [`**Winning trades for ${month}**`, " "];

  for (const winner of winners) {
    const member = await guild.members.fetch(winner.user_id);

    message.push(`${icon(index)} ${member.toString()} ${winner.wins} winners`);
  }

  return message.join("\n");
};

const map_thread_message = async (violations, guild) => {
  const date = new Date();
  const month = date.getMonth() + "-" + date.getFullYear();

  const message = [`**No thread usage violations for ${month}**`, " "];

  for (const violation of violations) {
    const member = await guild.members.fetch(violation.user_id);

    message.push(
      `${icon(index)} ${member.toString()} ${violation.strike} violations`
    );
  }

  return message.join("\n");
};

const map_retail_message = async (violations, guild) => {
  const date = new Date();
  const month = date.getMonth() + "-" + date.getFullYear();

  const message = [`**Retail violations leaderboard for ${month}**`, " "];

  for (const violation of violations) {
    const member = await guild.members.fetch(violation.user_id);

    message.push(
      `${icon(index)} ${member.toString()} ${violation.strike} violations`
    );
  }

  return message.join("\n");
};

const icon = (i) => {
  if (i === 0) {
    return "🥇";
  } else if (i === 1) {
    return "🥈";
  }

  return "🥉";
};

export default top_three;
