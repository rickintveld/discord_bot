import europe from "./economic_calendar/europe.js";
import new_york from "./economic_calendar/new_york.js";
import without_role from "./user/without_role.js";
import christmas from "./holiday/christmas.js";

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
};

export default crons;
