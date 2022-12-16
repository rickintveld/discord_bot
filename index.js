import { Client, GatewayIntentBits, Partials } from "discord.js";
import config from "./config.json" assert { type: "json" };
import violationInjection from "./violations/violationInjection.js";

import cron from "node-cron";
import europeCalendarCron from "./crons/europeCalendarCron.js";
import usaCalendarCron from "./crons/usaCalendarCron.js";
import cleanUpUsersWithoutRolesCron from "./crons/cleanUpUsersWithoutRolesCron.js";

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

violationInjection(client);

client.once("ready", async () => {
  console.log(`${client.user.username} is online.`);
});

cron.schedule(config.cron.eu, async () => {
  europeCalendarCron(client);
});
cron.schedule(config.cron.userCleanUp, async () => {
  cleanUpUsersWithoutRolesCron(client);
});
cron.schedule(config.cron.us, async () => {
  usaCalendarCron(client);
});

client.login(config.token);
