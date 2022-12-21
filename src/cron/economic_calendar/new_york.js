import config from "../../../config.json" assert { type: "json" };
import axios from "axios";
import message_map from "../../utilities/message.js";
import high_impact_news from "../../utilities/high_impact_news.js";

const new_york = async (client) => {
  const response = await axios.get(config.rssFeed);

  const events = response.data
    .filter((event) => ["USD", "CAD"].includes(event.country))
    .filter((event) => {
      const date = new Date().setHours(0, 0, 0, 0);
      const eventDate = new Date(event.date).setHours(0, 0, 0, 0);

      if (date === eventDate) {
        return event;
      }
    });

  if (!events) {
    console.error("No USD news today");
    return;
  }

  const channel = await client.channels.fetch(
    config.channels.economic_calendar
  );

  try {
    channel.send(message_map(events));
  } catch (e) {
    console.log(e);
  }

  try {
    channel.send(high_impact_news(events));
  } catch (e) {
    console.log(e);
  }
};

export default new_york;
