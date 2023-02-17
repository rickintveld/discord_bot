import config from "../../../config.json" assert { type: "json" };

const log = async (client) => {
  const channel = await client.channels.fetch(config.channels.bot.log);

  return channel;
};

const rules = async (client) => {
  const channel = await client.channels.fetch(config.channels.rules);

  return channel;
};

const economic_calendar = async (client) => {
  const channel = await client.channels.fetch(
    config.channels.economic_calendar
  );

  return channel;
};

const announcements = async (client) => {
  const channel = await client.channels.fetch(config.channels.announcements);

  return channel;
};

const general = async (client) => {
  const channel = await client.channels.fetch(config.channels.general);

  return channel;
};

const journey = async (client) => {
  const channel = await client.channels.fetch(config.channels.journey);

  return channel;
};

const bot_action = async (client) => {
  const channel = await client.channels.fetch(config.channels.bot.actions);

  return channel;
};

const channel = {
  announcements,
  economic_calendar,
  log,
  general,
  rules,
  journey,
  bot_action,
};

export default channel;
