import {
  Client,
  Events,
  GatewayIntentBits,
  Partials,
  Routes,
} from "discord.js";
import { REST } from "@discordjs/rest";
import config from "../config.json" assert { type: "json" };
import cron from "node-cron";
import crons from "./cron/crons.js";
import message from "./message/message.js";
import command from "./command/command.js";
import binding from "./binding/binding.js";

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

  client.once(Events.ClientReady, () => {
    console.log(`${client.user.username} is online.`);

    const rest = new REST({ version: 10 }).setToken(config.token);
    rest
      .put(Routes.applicationGuildCommands(config.clientId, config.guildId), {
        body: command.commands,
      })
      .then(() =>
        console.log(
          `Successfully registered ${command.commands.length} application commands`
        )
      )
      .catch(console.error);
  });

  cron.schedule("30 8 * * 1-5", async () => {
    crons.economic_calender.europe(client);
  });
  cron.schedule("0 9 * * *", async () => {
    crons.user.without_role(client);
  });
  cron.schedule("30 13 * * 1-5", async () => {
    crons.economic_calender.new_york(client);
  });
  cron.schedule("0 14 25 12 *", async () => {
    crons.holiday.christmas(client);
  });

  binding.commands.set(client);

  command.execute(client);

  message.reaction.new_user(client);
  message.reaction.setup(client);
  message.reaction.winner(client);

  message.violation.retail(client);
  message.violation.setup_thread_usage(client);

  client.login(config.token);
}

const bot = { start };

export default bot;
