import europe from "./economic_calendar/europe.js";
import new_york from "./economic_calendar/new_york.js";
import without_role from "./user/without_role.js";

const crons = {
  economic_calender: {
    europe,
    new_york,
  },
  user: {
    without_role,
  },
};

export default crons;
