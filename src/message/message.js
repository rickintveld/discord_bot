import setup from "./reaction/setup.js";
import winner from "./reaction/winner.js";
import new_user from "./reaction/new_user.js";

import thread_usage from "./violation/thread_usage.js";
import retail from "./violation/retail.js";

const messages = {
  violation: {
    retail,
    thread_usage,
  },
  reaction: {
    setup,
    winner,
    new_user,
  },
};

const monitor = (client) => {
  messages.reaction.new_user(client);
  messages.reaction.setup(client);
  messages.reaction.winner(client);

  messages.violation.retail(client);
  messages.violation.thread_usage(client);
};

const message = { monitor };

export default message;
