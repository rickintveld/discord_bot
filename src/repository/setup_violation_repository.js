import * as path from "node:path";
import { fileURLToPath } from "url";
import { Low } from "lowdb";
import { JSONFile } from "lowdb-node";

async function add(user_id, username, strike) {
  const database = await this._database();
  await database.read();

  const date = new Date();

  database.data.setup_violations.push({
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

  const { setup_violations } = database.data;

  if (setup_violations.length === 0) {
    return null;
  }

  const user = setup_violations.find((s) => s.user_id === user_id);

  return user;
}

async function update(user_id) {
  const database = await this._database();
  await database.read();

  const { setup_violations } = database.data;

  const user = setup_violations.find((u) => u.user_id === user_id);

  const users = setup_violations.filter((u) => u.user_id !== user_id);
  database.data.setup_violations = users;

  const updated = new Date();

  database.data.setup_violations.push({
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

  const { setup_violations } = database.data;

  const users = setup_violations.filter((u) => u.user_id !== user_id);
  database.data.setup_violations = users;

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

  if (database.data?.setup_violations) {
    return;
  }

  database.data ||= { setup_violations: [] };

  await database.write();
}

const setup_violation_repository = {
  add,
  remove,
  fetch,
  update,
  _createTable,
  _database,
};

export default setup_violation_repository;
