import { Events } from "discord.js";
import live_trading from "./poll/live_trading.js";
import competition_winner from "./competition/competition_winner.js";
import winners_score from "../command/score_board/winners_score.js";
import violation_score from "../command/score_board/violation_score.js";
import threads_score from "./score_board/threads_score.js";
import next_stage from "./journey/next_stage.js";
import set_stage from "./journey/set_stage.js";
import inactive_members from "./lurker/inactive_members.js";
import remove_inactive_member from "./lurker/remove_inactive_member.js";
import add_inactive_member from "./lurker/add_inactive_member.js";
import meme_generator from "./meme/meme_generator.js";
import webinar from "./webinar/webinar.js";
import passed_challenge from "./funded/passed_challenge.js";

const commands = [
  live_trading.data,
  competition_winner.data,
  winners_score.data,
  violation_score.data,
  threads_score.data,
  next_stage.data,
  set_stage.data,
  inactive_members.data,
  remove_inactive_member.data,
  add_inactive_member.data,
  meme_generator.data,
  webinar.data,
  passed_challenge.data,
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
