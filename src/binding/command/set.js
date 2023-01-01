import { Collection } from "discord.js";
import live_trading from "../../command/poll/live_trading.js";
import competition_winner from "../../command/competition/competition_winner.js";
import winners_score from "../../command/score_board/winners_score.js";
import violation_score from "../../command/score_board/violation_score.js";
import threads_score from "../../command/score_board/threads_score.js";

const set = (client) => {
  client.commands = new Collection();

  client.commands.set(live_trading.data.name, live_trading);
  client.commands.set(competition_winner.data.name, competition_winner);
  client.commands.set(winners_score.data.name, winners_score);
  client.commands.set(violation_score.data.name, violation_score);
  client.commands.set(threads_score.data.name, threads_score);
};

export default set;
