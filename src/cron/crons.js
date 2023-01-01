import europe from "./economic_calendar/europe.js";
import new_york from "./economic_calendar/new_york.js";
import without_role from "./user/without_role.js";
import christmas from "./holiday/christmas.js";
import top_three from "./leader_board/top_three.js";

const crons = {
  economic_calender: {
    europe,
    new_york,
  },
  holiday: {
    christmas,
  },
  user: {
    without_role,
  },
  leader_bord: {
    top_three,
  },
};

const schedule = (client) => {
  crons.economic_calender.europe(client);
  crons.economic_calender.new_york(client);

  crons.user.without_role(client);

  crons.holiday.christmas(client);

  crons.leader_bord.top_three(client);
};

const cron = { schedule };

export default cron;
