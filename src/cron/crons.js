import asia from "./economic_calendar/asia.js";
import europe from "./economic_calendar/europe.js";
import new_york from "./economic_calendar/new_york.js";
import without_role from "./user/without_role.js";
import christmas from "./holiday/christmas.js";

const crons = {
  economic_calender: {
    asia,
    europe,
    new_york,
  },
  holiday: {
    christmas,
  },
  user: {
    without_role,
  },
};

const schedule = (client) => {
  crons.economic_calender.asia(client);
  crons.economic_calender.europe(client);
  crons.economic_calender.new_york(client);
  crons.user.without_role(client);
  crons.holiday.christmas(client);
};

const cron = { schedule };

export default cron;
