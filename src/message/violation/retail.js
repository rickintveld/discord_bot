import config from "../../../config.json" assert { type: "json" };
import retail_keywords from "../../utilities/retail_keywords.js";
import guildRepository from "../../repository/guildRepository.js";
import retailViolationService from "../../service/retailViolationService.js";
import is_bot from "../../utilities/is_bot.js";

const retail = async (client) => {
  client.on("messageCreate", async (message) => {
    const memeChannels = config.channels.memes;

    if (is_bot(message)) return false;
    if (
      [memeChannels.retail, memeChannels.roast].includes(
        Number(message.channelId)
      )
    ) {
      return false;
    }

    const content = message.content.toLowerCase().split(" ");

    let violations = [];
    for (let index = 0; index < retail_keywords.length; index++) {
      let isRetail = content.includes(retail_keywords[index]);

      if (!isRetail) {
        continue;
      }

      violations.push(retail_keywords[index]);
    }

    violations.filter((x) => (x = x));

    if (violations.length > 0) {
      const member = await message.guild.members.fetch(message.author.id);

      await message.reply(
        `My retail sensors are tingling for using ${violations.join(
          ", "
        )} :face_with_monocle:`
      );

      try {
        if (Number(member.user.discriminator) !== config.admin.discriminator) {
          await guildRepository.timeout(member, "No retail bs allowed");
        }
        await retailViolationService.add(member.user);
      } catch (error) {
        console.log(error);
      }
    }
  });
};

export default retail;
