import setup from "./reaction/setup.js";
import winner from "./reaction/winner.js";

import setup_thread_usage from "./violation/setup_thread_usage.js";
import retail from "./violation/retail.js";

const message = {
  violation: {
    retail: retail,
    setup_thread_usage,
  },
  reaction: {
    setup,
    winner,
  },
};

export default message;
