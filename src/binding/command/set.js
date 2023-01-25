import { Collection } from "discord.js";
import live_trading from "../../command/poll/live_trading.js";
import competition_winner from "../../command/competition/competition_winner.js";
import winners_score from "../../command/score_board/winners_score.js";
import violation_score from "../../command/score_board/violation_score.js";
import threads_score from "../../command/score_board/threads_score.js";
import next_stage from "../../command/journey/next_stage.js";
import set_stage from "../../command/journey/set_stage.js";
import inactive_members from "../../command/lurker/inactive_members.js";
import remove_inactive_member from "../../command/lurker/remove_inactive_member.js";
import add_inactive_member from "../../command/lurker/add_inactive_member.js";
import meme_generator from "../../command/meme/meme_generator.js";
import webinar from "../../command/webinar/webinar.js";
import passed_challenge from "../../command/funded/passed_challenge.js";

const set = (client) => {
  client.commands = new Collection();

  client.commands.set(live_trading.data.name, live_trading);
  client.commands.set(competition_winner.data.name, competition_winner);
  client.commands.set(winners_score.data.name, winners_score);
  client.commands.set(violation_score.data.name, violation_score);
  client.commands.set(threads_score.data.name, threads_score);
  client.commands.set(next_stage.data.name, next_stage);
  client.commands.set(set_stage.data.name, set_stage);
  client.commands.set(inactive_members.data.name, inactive_members);
  client.commands.set(remove_inactive_member.data.name, remove_inactive_member);
  client.commands.set(add_inactive_member.data.name, add_inactive_member);
  client.commands.set(meme_generator.data.name, meme_generator);
  client.commands.set(webinar.data.name, webinar);
  client.commands.set(passed_challenge.data.name, passed_challenge);
};

export default set;
