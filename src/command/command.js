import { Events } from "discord.js";
import live_trading from "./poll/live_trading.js";
import winner from "./competition/winner.js";

const commands = [live_trading.data, winner.data].map((command) =>
  command.toJSON()
);

const execute = async (client) => {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(client, interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  });
};

const command = { commands, execute };

export default command;
