const impact_icon = (impact) => {
  let icon = ":red_circle:";

  switch (impact) {
    case "Medium":
      icon = ":orange_circle:";
      break;
    case "Low":
      icon = ":yellow_circle:";
      break;
    default:
      icon = ":red_circle:";
  }

  return icon;
};

export default impact_icon;
