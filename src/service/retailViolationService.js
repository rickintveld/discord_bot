import retailViolationRepository from "../repository/retailViolationRepository.js";

const retailViolationService = { add };

async function add(user) {
  const violator = await retailViolationRepository.fetch(user.id);

  if (violator === null) {
    await retailViolationRepository.add(user.id, user.username, 1);
  } else {
    await retailViolationRepository.update(
      user.id,
      violator.username,
      violator.strike + 1
    );
  }
}

export default retailViolationService;
