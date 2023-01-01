import retail_violation_repository from "../repository/retail_violation_repository.js";
import thread_violation_repository from "../repository/thread_violation_repository.js";
import winner_repository from "../repository/winner_repository.js";

const retail_violations = async () => {
  const all_violations = await retail_violation_repository.fetchAll();

  if (!all_violations) {
    throw new Error("No retail violations found");
  }

  const violations = all_violations
    .sort((a, b) => a.strike - b.strike)
    .reverse();

  return violations.slice(0, 3);
};

const thread_violations = async () => {
  const all_violations = await thread_violation_repository.fetchAll();

  if (!all_violations) {
    throw new Error("No non-thread violations found");
  }

  const violations = all_violations
    .sort((a, b) => a.strike - b.strike)
    .reverse();

  return violations.slice(0, 3);
};

const winners = async () => {
  const all_winners = await winner_repository.fetchAll();

  if (!all_winners) {
    throw new Error("No winning trades found");
  }

  const winners = all_winners.sort((a, b) => a.wins - b.wins).reverse();

  return winners.slice(0, 3);
};

const clean_up = async () => {
  Promise.all([
    thread_violation_repository.clearTable(),
    retail_violation_repository.clearTable(),
    winner_repository.clearTable(),
  ]);
};

const leader_board_service = {
  violations: {
    retail_violations,
    thread_violations,
  },
  trade: {
    winners,
  },
  data: {
    clean_up,
  },
};

export default leader_board_service;
