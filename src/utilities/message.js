import impact_icon from "./impact_icon.js";
import flag_map from "./flag.js";
import date_converter from "./date_converter.js";

const message_map = (events) => {
  const news = [];

  for (const event of events) {
    const message =
      flag_map(event.country) +
      " " +
      event.title +
      " " +
      impact_icon(event.impact) +
      " " +
      date_converter(event.date) +
      " :clock1:";

    news.push(message);
  }

  if (news.length > 0) {
    return news.join("\n");
  }

  throw new Error("No news today");
};

export default message_map;
