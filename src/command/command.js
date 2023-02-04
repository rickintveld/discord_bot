import { Events, EmbedBuilder, Colors } from "discord.js";
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

import bot_action_repository from "../repository/bot_action_repository.js";

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
      const message = new EmbedBuilder()
        .setColor(Colors.Red)
        .setDescription(error.message);

      bot_action_repository.log(client, message, true);
      await interaction.reply({ embeds: [message] });
    }
  });
};

const command = { commands, execute };

export default command;
