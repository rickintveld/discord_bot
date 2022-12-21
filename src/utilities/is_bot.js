import config from "../../config.json" assert { type: "json" };

const is_bot = (message) => {
  return Number(message.author.id) === config.bot.id;
};

export default is_bot;
