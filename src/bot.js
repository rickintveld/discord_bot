import {
  Client,
  Events,
  GatewayIntentBits,
  Partials,
  Routes,
} from "discord.js";
import { REST } from "@discordjs/rest";
import config from "../config.json" assert { type: "json" };
import cron from "./cron/crons.js";
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

  binding.commands.set(client);

  command.execute(client);

  cron.schedule(client);

  message.monitor(client);

  client.login(config.token);
}

const bot = { start };

export default bot;
