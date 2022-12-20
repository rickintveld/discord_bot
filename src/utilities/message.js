import impactIcon from "./impactIcon.js";
import flagMap from "./flag.js";
import dateConverter from "./dateConverter.js";

const messageMap = (event) => {
  const message =
    flagMap(event.country) +
    " " +
    event.title +
    " " +
    impactIcon(event.impact) +
    " " +
    dateConverter(event.date) +
    " :clock1:";

  return message;
};

export default messageMap;
