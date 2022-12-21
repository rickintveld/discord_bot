import winnerRepository from "../repository/winnerRepository.js";

export const winnerCreateService = { add };

async function add(author) {
  const user = await winnerRepository.fetch(author.id);

  if (!user) {
    await winnerRepository.add(author.id, author.username);
  } else {
    await winnerRepository.update(user.user_id);
  }
}

export default winnerCreateService;
