import config from "../../../config.json" assert { type: "json" };
import winnerCreateService from "../../service/winnerCreateService.js";

const winner = async (client) => {
  client.on("messageCreate", async (message) => {
    const channelId = message.channelId;
    if (Number(channelId) !== config.channels.winners) return false;
    if (Number(message.author.id) === config.bot.id) return false;
    if ([18, 21].includes(message.type)) return false;

    const hasAttachments = message.attachments.size;
    const urlPattern = new RegExp(
      "([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?"
    );

    const contentContainsUrl = urlPattern.test(message.content);

    if (hasAttachments || contentContainsUrl) {
      winnerCreateService.add(message.author);
      message.react("🔥");
      message.react("🥂");
      message.react("🤑");
    }
  });
};

export default winner;
