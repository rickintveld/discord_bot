import retail_violation_repository from "../repository/retail_violation_repository.js";

async function add(user) {
  const violator = await retail_violation_repository.fetch(user.id);

  if (violator === null) {
    await retail_violation_repository.add(user.id, user.username, 1);
  } else {
    await retail_violation_repository.update(user.id);
  }
}

const retail_violation_service = { add };

export default retail_violation_service;
