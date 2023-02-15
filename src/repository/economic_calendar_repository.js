import axios from "axios";
import config from "../../config.json" assert { type: "json" };

const tomorrow = async (countries) => {
  if (!Array.isArray(countries)) {
    throw new Error("Countries should be an array");
  }

  const response = await axios.get(config.rssFeed);

  const events = response.data
    .filter((event) => countries.includes(event.country))
    .filter((event) => {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      date.setHours(0, 0, 0, 0);

      const event_date = new Date(event.date);
      event_date.setHours(0, 0, 0, 0);

      if (date.getTime() === event_date.getTime()) {
        return event;
      }
    });

  if (events.length === 0) {
    throw new Error(`No ${countries.join(" & ")} news today`);
  }

  return events;
};

const today = async (countries) => {
  if (!Array.isArray(countries)) {
    throw new Error("Countries should be an array");
  }

  const response = await axios.get(config.rssFeed);

  const events = response.data
    .filter((event) => countries.includes(event.country))
    .filter((event) => {
      const date = new Date().setHours(0, 0, 0, 0);
      const eventDate = new Date(event.date).setHours(0, 0, 0, 0);

      if (date === eventDate) {
        return event;
      }
    });

  if (events.length === 0) {
    throw new Error(`No ${countries.join(" & ")} news for tomorrow`);
  }

  return events;
};

const economic_calendar_repository = {
  today,
  tomorrow,
};

export default economic_calendar_repository;
