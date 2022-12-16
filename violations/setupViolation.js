import config from "../config.json" assert { type: "json" };
import violationRepository from "../repository/setupViolationRepository.js";
import guildRepository from "../repository/guildRepository.js";

const setupViolation = async (client) => {
  client.on("messageCreate", async (message) => {
    const channelId = message.channelId;
    if (Number(channelId) !== config.channels.setups) return false;
    if (Number(message.author.id) === config.bot.id) return false;

    const hasAttachments = message.attachments.size;
    const hasUrlPattern = new RegExp(
      "([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?"
    );

    if (hasAttachments > 0 || hasUrlPattern.test(message.content)) {
      return false;
    }

    const username = message.author.username;
    const user_id = message.author.id;

    const user = await violationRepository.fetch(user_id);
    let strike = user?.strike ?? 0;

    let replyMessage =
      "Please use threads for discussion or questions about setups :innocent:";

    switch (strike) {
      case 1:
        replyMessage =
          "Please use threads for discussion or questions about setups :angry:";
        await violationRepository.update(user_id, username, 2);
        break;
      case 2:
        replyMessage = `I'm watching you ${username}, last warning, use threads :warning:`;
        await violationRepository.update(user_id, username, 3);
        break;
      case 3:
        replyMessage = `Yoo wtf ${username}, use THREADS. Timeout incoming :wave:`;
        await violationRepository.remove(user_id);
        break;
      default:
        console.log(`Adding ${username} to the violators`);
        await violationRepository.add(user_id, username, 1);
    }

    if (strike === 3) {
      const member = await message.guild.members.fetch(user_id);

      if (Number(member.user.discriminator) === config.admin.discriminator) {
        return false;
      }

      await message.channel.send(
        `${username} received a 10 seconde timeout for not using threads!`
      );
      await guildRepository.timeout(member, "Timeout for not using threads");
    } else {
      await message.channel.send(replyMessage);
    }
  });
};

export default setupViolation;
