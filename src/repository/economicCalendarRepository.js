import axios from "axios";
import config from "../../config.json" assert { type: "json" };

const today = async (countries) => {
  if (Array.isArray(countries)) {
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

  if (!events) {
    throw new Error(`No ${countries.join("")} neww today`);
  }

  return events;
};

const economicCalendarRepository = {
  today,
};

export default economicCalendarRepository;
