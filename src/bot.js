import { Client, GatewayIntentBits, Partials } from "discord.js";
import config from "../config.json" assert { type: "json" };
import cron from "node-cron";
import crons from "./cron/crons.js";
import message from "./message/message.js";

const bot = {
  start,
};

function start() {
  const client = new Client({
    intents: [
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildBans,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel, Partials.GuildMember],
  });

  client.once("ready", async () => {
    console.log(`${client.user.username} is online.`);
  });

  message.reaction.setup(client);
  message.reaction.winner(client);
  message.violation.retail(client);
  message.violation.setup_thread_usage(client);

  cron.schedule(config.cron.economic_calendar.europe, async () => {
    crons.economic_calender.europe(client);
  });
  cron.schedule(config.cron.user.without_role, async () => {
    crons.user.without_role(client);
  });
  cron.schedule(config.cron.economic_calendar.new_york, async () => {
    crons.economic_calender.new_york(client);
  });

  client.login(config.token);
}

export default bot;
