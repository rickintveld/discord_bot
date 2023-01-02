import config from "../../../config.json" assert { type: "json" };
import message_map from "../../utilities/message.js";
import cron from "node-cron";
import economic_calendar_repository from "../../repository/economic_calendar_repository.js";

const europe = async (client) => {
  cron.schedule("30 8 * * 1-5", async () => {
    const countries = ["EUR", "GBP"];
    let events = null;

    try {
      events = await economic_calendar_repository.today(countries);
    } catch (e) {
      console.error(e.message);

      return;
    }

    const channel = await client.channels.fetch(
      config.channels.economic_calendar
    );

    channel.send(message_map(events));
  });
};

export default europe;
