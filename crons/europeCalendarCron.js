import config from "../config.json" assert { type: "json" };
import axios from "axios";
import message from "../utils/message.js";

const europeCalendarCron = async (client) => {
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
    console.error("No EU news today");
    return;
  }

  const news = [];
  for (const event of events) {
    news.push(message(event));
  }

  const channel = await client.channels.fetch(config.channels.economicCalendar);
  if (channel && news.length > 0) {
    console.log("Sending EU / GBP news", news);
    await channel.send(news.join("\n"));
  } else {
    console.error("No EU news today");
  }
};

export default europeCalendarCron;
