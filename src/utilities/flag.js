const flag_map = (country) => {
  let flag = ":flag_us:";

  switch (country) {
    case "EUR":
      flag = ":flag_eu:";
      break;
    case "GBP":
      flag = ":flag_gb:";
      break;
    case "CAD":
      flag = ":flag_ca:";
      break;
    default:
      flag = ":flag_us:";
  }

  return flag;
};

export default flag_map;
