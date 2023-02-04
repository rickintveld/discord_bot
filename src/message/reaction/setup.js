import config from "../../../config.json" assert { type: "json" };
import is_bot from "../../utilities/is_bot.js";
import has_attachments from "../../utilities/has_attachments.js";
import contains_url from "../../utilities/contains_url.js";
import { Events, MessageType } from "discord.js";
import bot_action_repository from "../../repository/bot_action_repository.js";

const setup = async (client) => {
  client.on(Events.MessageCreate, async (message) => {
    if (is_channel_allowed(message)) return false;
    if (is_bot(message)) return false;
    if (is_message_type_allowed(message)) return false;

    if (has_attachments(message) || contains_url(message)) {
      message.react("🔥");

      bot_action_repository.log(
        client,
        `New setups added by ${message.author.username}`,
        false
      );
    }
  });
};

const is_channel_allowed = (message) => {
  return Number(message.channelId) !== config.channels.setups;
};

const is_message_type_allowed = (message) => {
  return [MessageType.ThreadCreated, MessageType.ThreadStarterMessage].includes(
    message.type
  );
};

export default setup;
