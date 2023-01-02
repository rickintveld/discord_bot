import * as path from "node:path";
import { fileURLToPath } from "url";
import { Low } from "lowdb";
import { JSONFile } from "lowdb-node";

async function add(user_id, messages) {
  const database = await this._database();
  await database.read();

  database.data.lurkers.push({
    user_id: user_id,
    messages: messages,
  });

  await database.write();
}

async function fetchAll() {
  const database = await this._database();
  await database.read();

  const { lurkers } = database.data;

  if (lurkers.length === 0) {
    return null;
  }

  return lurkers;
}

async function remove(user_id) {
  const database = await this._database();
  await database.read();

  const { lurkers } = database.data;

  const users = lurkers.filter((u) => u.user_id !== user_id);
  database.data.lurkers = users;

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

  if (database.data?.lurkers) {
    return;
  }

  database.data ||= { lurkers: [] };

  await database.write();
}

const lurker_repository = {
  add,
  remove,
  fetchAll,
  _createTable,
  _database,
};

export default lurker_repository;
