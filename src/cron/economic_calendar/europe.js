import cron from "node-cron";
import bot_action_repository from "../../repository/guild/bot_action_repository.js";
import channel_repository from "../../repository/guild/channel_repository.js";
import economic_calendar_repository from "../../repository/economic_calendar_repository.js";
import message_map from "../../utilities/message.js";

const europe = async (client) => {
  cron.schedule("0 8 * * 1-5", async () => {
    const countries = ["EUR", "GBP"];
    let events = null;

    try {
      events = await economic_calendar_repository.today(countries);
    } catch (e) {
      bot_action_repository.log(client, e.message, true);

      return;
    }

    const channel = await channel_repository.economic_calendar(client);

    channel.send(message_map(events));

    bot_action_repository.log(
      client,
      `Posted the economic calendar for ${countries.join(" & ")}`,
      false
    );
  });
};

export default europe;
