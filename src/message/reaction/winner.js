import config from "../../../config.json" assert { type: "json" };
import winnerCreateService from "../../service/winnerCreateService.js";
import has_attachments from "../../utilities/has_attachments.js";
import contains_url from "../../utilities/contains_url.js";
import { MessageType } from "discord.js";

const winner = async (client) => {
  client.on("messageCreate", async (message) => {
    const channelId = message.channelId;
    if (Number(channelId) !== config.channels.winners) return false;
    if (Number(message.author.id) === config.bot.id) return false;
    if (is_message_type_allowed(message)) return false;

    if (has_attachments(message) || contains_url(message)) {
      winnerCreateService.add(message.author);
      message.react("🔥");
      message.react("🥂");
      message.react("🤑");
    }
  });
};

const is_message_type_allowed = (message) => {
  return [MessageType.ThreadCreated, MessageType.ThreadStarterMessage].includes(
    message.type
  );
};

export default winner;
