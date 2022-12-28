import config from "../../../config.json" assert { type: "json" };
import message_map from "../../utilities/message.js";
import cron from "node-cron";
import economic_calendar_repository from "../../repository/economic_calendar_repository.js";

const europe = async (client) => {
  cron.schedule("15 9 * * 1-5", async () => {
    let events = null;

    try {
      events = await economic_calendar_repository.today(["EUR", "GBP"]);
    } catch (e) {
      console.log(e.message);

      return;
    }

    const channel = await client.channels.fetch(
      config.channels.economic_calendar
    );

    channel.send(message_map(events));
  });
};

export default europe;
