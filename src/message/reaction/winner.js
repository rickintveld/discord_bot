import config from "../../../config.json" assert { type: "json" };
import winner_create_service from "../../service/winner_create_service.js";
import has_attachments from "../../utilities/has_attachments.js";
import contains_url from "../../utilities/contains_url.js";
import { Events, MessageType } from "discord.js";
import bot_action_repository from "../../repository/guild/bot_action_repository.js";

const winner = async (client) => {
  client.on(Events.MessageCreate, async (message) => {
    const channelId = message.channelId;
    if (Number(channelId) !== config.channels.winners) return false;
    if (Number(message.author.id) === config.bot.id) return false;
    if (is_message_type_allowed(message)) return false;

    if (has_attachments(message) || contains_url(message)) {
      winner_create_service.add(message.author);

      message.react("🔥");
      message.react("🤑");

      bot_action_repository.log(
        client,
        `New winner added by ${message.author.username}`,
        false
      );
    }
  });
};

const is_message_type_allowed = (message) => {
  return [MessageType.ThreadCreated, MessageType.ThreadStarterMessage].includes(
    message.type
  );
};

export default winner;
