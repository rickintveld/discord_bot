import config from "../../../config.json" assert { type: "json" };
import retailKeywords from "../../utilities/retailKeywords.js";
import guildRepository from "../../repository/guildRepository.js";
import retailViolationService from "../../service/retailViolationService.js";

const retail = async (client) => {
  client.on("messageCreate", async (message) => {
    const channelId = message.channelId;
    const memeChannels = config.channels.memes;

    if (Number(message.author.id) === config.bot.id) return false;
    if ([memeChannels.retail, memeChannels.burn].includes(Number(channelId))) {
      return false;
    }

    const content = message.content.toLowerCase().split(" ");

    let violations = [];
    for (let index = 0; index < retailKeywords.length; index++) {
      let isRetail = content.includes(retailKeywords[index]);

      if (!isRetail) {
        continue;
      }

      violations.push(retailKeywords[index]);
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
