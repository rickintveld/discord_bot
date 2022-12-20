import config from "../../../config.json" assert { type: "json" };
import axios from "axios";
import message from "../../utilities/message.js";

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

  const news = [];
  for (const event of events) {
    news.push(message(event));
  }

  const channel = await client.channels.fetch(
    config.channels.economic_calendar
  );

  if (news.length > 0) {
    console.log("Sending USD news", news);
    await channel.send(news.join("\n"));
  } else {
    console.error("No USD news today");
  }
};

export default new_york;
