import { Client, Events, GatewayIntentBits, Partials } from "discord.js";
import config from "../config.json" assert { type: "json" };
import cron from "node-cron";
import crons from "./cron/crons.js";
import message from "./message/message.js";

function start() {
  const client = new Client({
    intents: [
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildBans,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildEmojisAndStickers,
    ],
    partials: [Partials.Channel, Partials.GuildMember],
  });

  client.once(Events.ClientReady, async () => {
    console.log(`${client.user.username} is online.`);
  });

  cron.schedule(config.cron.economic_calendar.europe, async () => {
    crons.economic_calender.europe(client);
  });
  cron.schedule(config.cron.user.without_role, async () => {
    crons.user.without_role(client);
  });
  cron.schedule(config.cron.economic_calendar.new_york, async () => {
    crons.economic_calender.new_york(client);
  });

  message.reaction.new_user(client);
  message.reaction.setup(client);
  message.reaction.winner(client);

  message.violation.retail(client);
  message.violation.setup_thread_usage(client);

  client.login(config.token);
}

const bot = { start };

export default bot;
