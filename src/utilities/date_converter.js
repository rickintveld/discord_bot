const date_converter = (dateTime) => {
  let date = new Date(dateTime).toLocaleString("nl-NL", {
    timeZone: "Europe/London",
  });

  date += " +0 GMT";

  return date;
};

export default date_converter;
