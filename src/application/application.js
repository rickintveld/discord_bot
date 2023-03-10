import {
  Client,
  Events,
  GatewayIntentBits,
  Partials,
  Routes,
} from "discord.js";
import { REST } from "@discordjs/rest";
import config from "../../config.json" assert { type: "json" };
import command from "../command/command.js";
import dotenv from "dotenv";

const client = () => {
  const environment_config = dotenv.config().parsed;
  const token = environment_config.DISCORD_TOKEN;
  const client_id = environment_config.DISCORD_CLIENT_ID;

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

    const rest = new REST({ version: 10 }).setToken(token);
    rest
      .put(Routes.applicationGuildCommands(client_id, config.guildId), {
        body: command.commands,
      })
      .then(() =>
        console.log(
          `Successfully registered ${command.commands.length} application commands`
        )
      )
      .catch(console.error);
  });

  return client;
};

const application = { client };

export default application;
