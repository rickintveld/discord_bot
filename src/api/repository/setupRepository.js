import config from "../../../config.json" assert { type: "json" };

const setupRepository = { save };

async function save() {
  const body = {
    date: new Date().toISOString,
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
    await fetch("http://localhost:3001/shared_setup/add", requestOptions);
  } catch (e) {
    console.error(e);
  }
}

export default setupRepository;
