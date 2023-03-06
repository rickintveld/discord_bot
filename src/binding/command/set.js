import { Collection } from "discord.js";
import live_trading from "../../command/poll/live_trading.js";
import competition_winner from "../../command/competition/competition_winner.js";
import next_stage from "../../command/journey/next_stage.js";
import set_stage from "../../command/journey/set_stage.js";
import meme_generator from "../../command/meme/meme_generator.js";
import webinar from "../../command/webinar/webinar.js";
import new_webinar from "../../command/webinar/new_webinar.js";
import passed_challenge from "../../command/funded/passed_challenge.js";
import invite from "../../command/community/invite.js";

const set = (client) => {
  client.commands = new Collection();

  client.commands.set(live_trading.data.name, live_trading);
  client.commands.set(competition_winner.data.name, competition_winner);
  client.commands.set(next_stage.data.name, next_stage);
  client.commands.set(set_stage.data.name, set_stage);
  client.commands.set(meme_generator.data.name, meme_generator);
  client.commands.set(webinar.data.name, webinar);
  client.commands.set(new_webinar.data.name, new_webinar);
  client.commands.set(passed_challenge.data.name, passed_challenge);
  client.commands.set(invite.data.name, invite);
};

export default set;
