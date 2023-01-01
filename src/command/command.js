import { Events } from "discord.js";
import live_trading from "./poll/live_trading.js";
import competition_winner from "./competition/competition_winner.js";
import winners_score from "../command/score_board/winners_score.js";
import violation_score from "../command/score_board/violation_score.js";
import threads_score from "./score_board/threads_score.js";
import next_phase from "./journey/next_phase.js";
import set_phase from "./journey/set_phase.js";

const commands = [
  live_trading.data,
  competition_winner.data,
  winners_score.data,
  violation_score.data,
  threads_score.data,
  next_phase.data,
  set_phase.data,
].map((command) => command.toJSON());

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
