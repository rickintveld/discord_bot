import config from "../config.json" assert { type: "json" };
import retail from "../utils/retail.js";
import guildRepository from "../repository/guildRepository.js";

const retailViolation = async (client) => {
  client.on("messageCreate", async (message) => {
    const channelId = message.channelId;
    const memeChannels = config.channels.memes;

    if (Number(message.author.id) === config.bot.id) return false;
    if ([memeChannels.retail, memeChannels.burn].includes(Number(channelId))) {
      return false;
    }

    const content = message.content.toLowerCase().split(" ");
    let violations = [];

    for (let index = 0; index < retail.length; index++) {
      let isRetail = content.includes(retail[index]);

      if (!isRetail) {
        continue;
      }

      violations.push(retail[index]);
    }

    violations.filter((x) => (x = x));

    if (violations.length > 0) {
      const member = await message.guild.members.fetch(message.author.id);

      await message.channel.send(
        `My retail sensors are tingling for using ${violations.join(
          ", "
        )} :face_with_monocle:`
      );

      if (Number(member.user.discriminator) === config.admin.discriminator) {
        return false;
      }

      try {
        await guildRepository.timeout(10 * 1000, "No retail bs allowed");
      } catch (error) {
        console.log(error);
      }
    }
  });
};

export default retailViolation;
