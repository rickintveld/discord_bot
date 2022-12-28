import config from "../../../config.json" assert { type: "json" };
import message_map from "../../utilities/message.js";
import high_impact_news from "../../utilities/high_impact_news.js";
import cron from "node-cron";
import economic_calendar_repository from "../../repository/economic_calendar_repository.js";

const new_york = async (client) => {
  cron.schedule("30 13 * * 1-5", async () => {
    let events = null;

    try {
      events = await economic_calendar_repository.today(["USD", "CAD"]);
    } catch (e) {
      console.log(e.message);
      return;
    }

    const channel = await client.channels.fetch(
      config.channels.economic_calendar
    );

    channel.send(message_map(events));

    try {
      channel.send(high_impact_news(events));
    } catch (e) {
      console.error(e.message);
    }
  });
};

export default new_york;
