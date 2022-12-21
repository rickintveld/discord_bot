import * as path from "node:path";
import { fileURLToPath } from "url";
import { Low } from "lowdb";
import { JSONFile } from "lowdb-node";

const retailViolationRepository = {
  add,
  remove,
  fetch,
  update,
  _createTable,
  _database,
};

async function add(user_id, username, strike) {
  const database = await this._database();
  await database.read();

  const date = new Date();

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

async function update(user_id) {
  const database = await this._database();
  await database.read();

  const { retail_violations } = database.data;

  const user = retail_violations.find((u) => u.user_id === user_id);

  const users = retail_violations.filter((u) => u.user_id !== user_id);
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

  const { retail_violations } = database.data;

  const users = retail_violations.filter((u) => u.user_id !== user_id);
  database.data.retail_violations = users;

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

export default retailViolationRepository;
