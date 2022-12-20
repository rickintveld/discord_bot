import config from "../../../config.json" assert { type: "json" };
import setupController from "../../api/controller/setupController.js";

const setup = async (client) => {
  client.on("messageCreate", async (message) => {
    const channelId = message.channelId;
    if (Number(channelId) !== config.channels.setups) return false;
    if (Number(message.author.id) === config.bot.id) return false;
    if ([18, 21].includes(message.type)) return false;

    const hasAttachments = message.attachments.size;
    const urlPattern = new RegExp(
      "([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?"
    );

    const contentContainsUrl = urlPattern.test(message.content);

    if (hasAttachments || contentContainsUrl) {
      await setupController.add();
      message.react("🔥");
    }
  });
};

export default setup;
