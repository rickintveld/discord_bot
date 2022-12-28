import winner_repository from "../repository/winner_repository.js";

async function add(author) {
  const user = await winner_repository.fetch(author.id);

  if (!user) {
    await winner_repository.add(author.id, author.username);
  } else {
    await winner_repository.update(user.user_id);
  }
}

const winner_create_service = { add };

export default winner_create_service;
