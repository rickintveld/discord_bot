import config from "../../../config.json" assert { type: "json" };
import axios from "axios";

async function save() {
  const body = {
    date: new Date().toISOString(),
  };

  const headers = {
    "Content-Type": "application/json",
    "Bot-Type": "SMC_DISCORD_BOT",
    "Bot-Key": config.guildId,
  };

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  };

  try {
    await axios.post("http://localhost:3001/shared_setup/add", requestOptions);
  } catch (e) {
    console.error(e);
  }
}

const setup_repository = { save };

export default setup_repository;
