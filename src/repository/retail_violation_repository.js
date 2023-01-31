import * as path from "node:path";
import { fileURLToPath } from "url";
import { Low } from "lowdb";
import { JSONFile } from "lowdb-node";

async function add(user_id, username, strike) {
  const database = await this._database();
  await database.read();

  const date = new Date();

  console.log(`Adding ${username} to the violators DB`);

  database.data.retail_violations.push({
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

  const { retail_violations } = database.data;

  if (retail_violations.length === 0) {
    return null;
  }

  const user = retail_violations.find((s) => s.user_id === user_id);

  return user;
}

async function fetchAll() {
  const database = await this._database();
  await database.read();

  const { retail_violations } = database.data;

  if (retail_violations.length === 0) {
    return null;
  }

  return retail_violations;
}

async function update(user_id) {
  const database = await this._database();
  await database.read();

  console.log(`Adding a new violation for ${user_id}`);

  const { retail_violations } = database.data;

  const user = retail_violations.find((u) => u.user_id == user_id);

  const users = retail_violations.filter((u) => u.user_id != user_id);
  database.data.retail_violations = users;

  const updated = new Date();

  database.data.retail_violations.push({
    user_id: user.user_id,
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

  console.log(`Removing ${user_id} from the violators DB`);

  const { retail_violations } = database.data;

  const users = retail_violations.filter((u) => u.user_id !== user_id);
  database.data.retail_violations = users;

  await database.write();
}

async function clearTable() {
  const database = await this._database();
  await database.read();

  database.data.retail_violations = [];

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

  if (database.data?.retail_violations) {
    return;
  }

  database.data ||= { retail_violations: [] };

  await database.write();
}

const retail_violation_repository = {
  add,
  remove,
  fetch,
  fetchAll,
  update,
  clearTable,
  _createTable,
  _database,
};

export default retail_violation_repository;
