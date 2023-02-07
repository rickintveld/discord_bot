import { SlashCommandBuilder, EmbedBuilder, Colors } from "discord.js";
import config from "../../../config.json" assert { type: "json" };
import bot_action_repository from "../../repository/bot_action_repository.js";

const error_message = "Something went wrong, contact the admin";
const log_message = (user) => `${user.toString()} requested an invitation`;

const data = new SlashCommandBuilder()
  .setName("invite")
  .setDescription(
    "Creates an invite for 1 member only which is valid for 24 hours"
  );

const execute = async (client, interaction) => {
  const channel = await client.channels.fetch(config.channels.rules);
  const invite = await channel.createInvite({
    magAge: 10 * 60 * 1000,
    maxUse: 1,
  });

  const embed = new EmbedBuilder()
    .setColor(invite ? Colors.Blue : Colors.Red)
    .setDescription(invite ? invite.url : error_message);

  interaction.reply({ embeds: [embed], ephemeral: true });

  bot_action_repository.log(client, log_message(interaction.user), false);
};

const invite = { data, execute };

export default invite;
