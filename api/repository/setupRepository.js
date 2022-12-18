import config from "../../config.json" assert { type: "json" };

const setupRepository = { insert };

async function insert(username, imageUrl) {
  const date = new Date();

  const body = {
    username: username,
    image: imageUrl,
    date: date.toISOString(),
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
    await fetch("http://localhost:3001/user/insert-setup", requestOptions);
  } catch (e) {
    console.error(e);
  }
}

export default setupRepository;
