import config from "../../../config.json" assert { type: "json" };
import cron from "node-cron";

const christmas = async (client) => {
  cron.schedule("0 14 25 12 *", async () => {
    const channel = await client.channels.fetch(config.channels.announcements);

    channel.send(
      "May your heart and home be filled with all of the joys the festive season brings 🎄. \n Here is a toast to a Merry Christmas and a prosperous New Year 🥂"
    );
    channel.send({
      files: ["./asset/image/holiday/celebration.gif"],
    });
  });
};

export default christmas;
