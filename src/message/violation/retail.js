import { Events, EmbedBuilder, Colors } from "discord.js";
import config from "../../../config.json" assert { type: "json" };
import retail_keywords from "../../utilities/retail_keywords.js";
import guild_repository from "../../repository/guild/guild_repository.js";
import is_bot from "../../utilities/is_bot.js";
import bot_action_repository from "../../repository/guild/bot_action_repository.js";

const retail = async (client) => {
  client.on(Events.MessageCreate, async (message) => {
    if (is_bot(message)) return false;
    if (is_channel_allowed(message)) return false;

    const content = message.content.toLowerCase().split(" ");

    let violations = [];
    for (let index = 0; index < retail_keywords.length; index++) {
      let isRetail = content.includes(retail_keywords[index]);

      if (!isRetail) continue;

      violations.push(retail_keywords[index]);
    }

    violations.filter((x) => (x = x));

    if (violations.length > 0) {
      const member = await message.guild.members.fetch(message.author.id);

      const embed_message = new EmbedBuilder()
        .setColor(Colors.Red)
        .setDescription(
          `My retail sensors are tingling for using ${violations.join(", ")}`
        );

      await message.reply({ embeds: [embed_message] });

      try {
        await guild_repository.timeout(member, "No retail bs allowed");

        bot_action_repository.log(
          client,
          `New retail violation for ${message.author.username}`,
          false
        );
      } catch (error) {
        console.log(error);
        bot_action_repository.log(client, error.message, true);
      }
    }
  });
};

const is_channel_allowed = (message) => {
  const memeChannels = config.channels.memes;

  return [memeChannels.retail, memeChannels.roast].includes(
    Number(message.channelId)
  );
};

export default retail;
