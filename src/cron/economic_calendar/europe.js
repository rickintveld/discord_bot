import config from "../../../config.json" assert { type: "json" };
import axios from "axios";
import message_map from "../../utilities/message.js";
import cron from "node-cron";

const europe = async (client) => {
  cron.schedule("30 8 * * 1-5", async () => {
    const response = await axios.get(config.rssFeed);

    const events = response.data
      .filter((event) => ["EUR", "GBP"].includes(event.country))
      .filter((event) => {
        const date = new Date().setHours(0, 0, 0, 0);
        const eventDate = new Date(event.date).setHours(0, 0, 0, 0);

        if (date === eventDate) {
          return event;
        }
      });

    if (!events) {
      console.error("No EU / GBP news today");
      return;
    }

    const channel = await client.channels.fetch(
      config.channels.economic_calendar
    );

    try {
      channel.send(message_map(events));
    } catch (e) {
      console.warn(e.message);
    }
  });
};

export default europe;
