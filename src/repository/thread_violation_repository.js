import * as path from "node:path";
import { fileURLToPath } from "url";
import { Low } from "lowdb";
import { JSONFile } from "lowdb-node";

async function add(user_id, username, strike) {
  const database = await this._database();
  await database.read();

  const date = new Date();

  database.data.thread_violations.push({
    user_id: user_id,
    username: username,
    strike: strike,
    created: date.toISOString(),
    updated: date.toISOString(),
  });

  await database.write();
}

async function fetch(user_id) {
  const database = await this._database();
  await database.read();

  const { thread_violations } = database.data;

  if (thread_violations.length === 0) {
    return null;
  }

  const user = thread_violations.find((s) => s.user_id === user_id);

  return user;
}

async function fetchAll() {
  const database = await this._database();
  await database.read();

  const { thread_violations } = database.data;

  if (thread_violations.length === 0) {
    return null;
  }

  return thread_violations;
}

async function update(user_id) {
  const database = await this._database();
  await database.read();

  const { thread_violations } = database.data;

  const user = thread_violations.find((u) => u.user_id === user_id);

  const users = thread_violations.filter((u) => u.user_id !== user_id);
  database.data.thread_violations = users;

  const updated = new Date();

  database.data.thread_violations.push({
    user_id: user_id,
    username: user.username,
    strike: user.strike + 1,
    created: user.created,
    updated: updated.toISOString(),
  });

  await database.write();
}

async function remove(user_id) {
  const database = await this._database();
  await database.read();

  const { thread_violations } = database.data;

  const users = thread_violations.filter((u) => u.user_id !== user_id);
  database.data.thread_violations = users;

  await database.write();
}

async function clearTable() {
  const database = await this._database();
  await database.read();

  database.data.thread_violations = [];

  await database.write();
}

async function _database() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const file = path.join(__dirname, "db.json");

  const adapter = new JSONFile(file);
  const database = new Low(adapter);

  await this._createTable(database);

  return database;
}

async function _createTable(database) {
  await database.read();

  if (database.data?.thread_violations) {
    return;
  }

  database.data ||= { thread_violations: [] };

  await database.write();
}

const thread_violation_repository = {
  add,
  remove,
  fetch,
  fetchAll,
  update,
  clearTable,
  _createTable,
  _database,
};

export default thread_violation_repository;
