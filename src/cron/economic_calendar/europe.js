import config from "../../../config.json" assert { type: "json" };
import message_map from "../../utilities/message.js";
import cron from "node-cron";
import economic_calendar_repository from "../../repository/economic_calendar_repository.js";
import bot_action_repository from "../../repository/bot_action_repository.js";

const europe = async (client) => {
  cron.schedule("30 8 * * 1-5", async () => {
    const countries = ["EUR", "GBP"];
    let events = null;

    try {
      events = await economic_calendar_repository.today(countries);
    } catch (e) {
      console.error(e.message);
      bot_action_repository.log(client, e.message, false);

      return;
    }

    const channel = await client.channels.fetch(
      config.channels.economic_calendar
    );

    channel.send(message_map(events));

    bot_action_repository.log(
      client,
      `Posted the economic calendar for ${countries.join(" & ")}`,
      false
    );
  });
};

export default europe;
