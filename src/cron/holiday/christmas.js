import cron from "node-cron";
import channel_repository from "../../repository/channel_repository.js";

const christmas = async (client) => {
  cron.schedule("0 10 25 12 *", async () => {
    const channel = await channel_repository.announcements(client);

    channel.send(
      "May your heart and home be filled with all of the joys the festive season brings 🎄. \n Here is a toast to a Merry Christmas and a prosperous New Year 🥂"
    );
    channel.send({
      files: ["./asset/image/holiday/celebration.gif"],
    });
  });
};

export default christmas;
