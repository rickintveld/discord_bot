import { Events, EmbedBuilder, Colors } from "discord.js";
import live_trading from "./poll/live_trading.js";
import competition_winner from "./competition/competition_winner.js";
import next_stage from "./journey/next_stage.js";
import set_stage from "./journey/set_stage.js";
import meme_generator from "./meme/meme_generator.js";
import webinar from "./webinar/webinar.js";
import new_webinar from "./webinar/new_webinar.js";
import passed_challenge from "./funded/passed_challenge.js";
import invite from "./community/invite.js";

import bot_action_repository from "../repository/guild/bot_action_repository.js";

const commands = [
  live_trading.data,
  competition_winner.data,
  next_stage.data,
  set_stage.data,
  meme_generator.data,
  webinar.data,
  new_webinar.data,
  passed_challenge.data,
  invite.data,
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
