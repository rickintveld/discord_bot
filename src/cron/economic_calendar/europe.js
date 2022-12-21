import config from "../../../config.json" assert { type: "json" };
import axios from "axios";
import message_map from "../../utilities/message.js";

const europe = async (client) => {
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

  try {
    channel.send(high_impact_news(events));
  } catch (e) {
    console.error(e.message);
  }
};

export default europe;
