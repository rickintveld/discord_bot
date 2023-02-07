import message_map from "../../utilities/message.js";
import high_impact_news from "../../utilities/high_impact_news.js";
import cron from "node-cron";
import economic_calendar_repository from "../../repository/economic_calendar_repository.js";
import bot_action_repository from "../../repository/bot_action_repository.js";
import channel_repository from "../../repository/channel_repository.js";

const new_york = async (client) => {
  cron.schedule("0 13 * * 1-5", async () => {
    let events = null;

    try {
      events = await economic_calendar_repository.today(["USD", "CAD"]);
    } catch (e) {
      console.error(e.message);
      bot_action_repository.log(client, e.message, true);

      return;
    }

    const channel = await channel_repository.economic_calendar(client);

    channel.send(message_map(events));

    bot_action_repository.log(
      client,
      `Posted the economic calendar for ${countries.join(" & ")}`,
      false
    );

    try {
      channel.send(high_impact_news(events));
      bot_action_repository.log(
        client,
        "High impact news notification send.",
        false
      );
    } catch (e) {
      console.error(e.message);
      bot_action_repository.log(client, e.message, true);
    }
  });
};

export default new_york;
