const date_converter = (dateTime) => {
  let date = new Date(dateTime).toLocaleString("nl-NL", {
    timeZone: "Europe/London",
  });

  date += " +0 GMT";

  const timestamp = Math.floor(new Date(dateTime).getTime() / 1000);

  return `<t:${timestamp}:f>`;
};

export default date_converter;
