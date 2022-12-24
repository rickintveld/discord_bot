import * as path from "node:path";
import { fileURLToPath } from "url";
import { Low } from "lowdb";
import { JSONFile } from "lowdb-node";

const winnerRepository = {
  add,
  remove,
  fetch,
  update,
  _createTable,
  _database,
};

async function add(user_id, username) {
  const database = await this._database();
  await database.read();

  const date = new Date();

  database.data.winners.push({
    user_id: user_id,
    username: username,
    wins: 1,
    since: date.toISOString(),
  });

  await database.write();
}

async function fetch(user_id) {
  const database = await this._database();
  await database.read();

  const { winners } = database.data;

  if (winners.length === 0) {
    return null;
  }

  const user = winners.find((s) => s.user_id === user_id);

  return user;
}

async function update(user_id) {
  const database = await this._database();
  await database.read();

  const { winners } = database.data;

  const user = winners.find((u) => u.user_id === user_id);

  const users = winners.filter((u) => u.user_id !== user_id);
  database.data.winners = users;

  database.data.winners.push({
    user_id: user.user_id,
    username: user.username,
    wins: user.wins + 1,
    since: user.since,
  });

  await database.write();
}

async function remove(user_id) {
  const database = await this._database();
  await database.read();

  const { winners } = database.data;

  const users = winners.filter((u) => u.user_id !== user_id);
  database.data.winners = users;

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

  if (database.data?.winners) {
    return;
  }

  database.data ||= { winners: [] };

  await database.write();
}

export default winnerRepository;
