import application from "./application/application.js";
import binding from "./binding/binding.js";
import config from "../config.json" assert { type: "json" };
import command from "./command/command.js";
import cron from "./cron/crons.js";
import message from "./message/message.js";

function start() {
  const client = application.client();

  binding.commands.set(client);

  command.execute(client);

  cron.schedule(client);

  message.monitor(client);

  client.login(config.token);
}

const bot = { start };

export default bot;
