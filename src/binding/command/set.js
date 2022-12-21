import { Collection } from "discord.js";
import live_trading from "../../command/poll/live_trading.js";

const set = (client) => {
  client.commands = new Collection();
  client.commands.set(live_trading.data.name, live_trading);
};

export default set;
