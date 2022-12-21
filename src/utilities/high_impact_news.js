import date_converter from "./date_converter.js";

const high_impact_news = (events) => {
  const NFP = "Non-Farm Employment Change";
  const CPI = "CPI y/y";

  const event = events.find(
    (e) => e.country === "USD" && [NFP, CPI].includes(e.title)
  );

  if (!event) {
    throw new Error("No NFP or CPI events found today");
  }

  let message = [
    "<@everyone>",
    `Be extra careful trading today because of ${
      event.title
    } at ${date_converter(event.date)}`,
  ];

  return message.join("\n");
};

export default high_impact_news;
