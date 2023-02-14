import * as path from "node:path";
import { fileURLToPath } from "url";
import { Low } from "lowdb";
import { JSONFile } from "lowdb-node";

async function fetch(id) {
  const database = await this._database();
  await database.read();

  const { webinars } = database.data;

  if (webinars.length === 0) {
    return null;
  }

  const webinar = webinars.find((s) => s.webinar === id);

  return webinar;
}

async function add(webinar_number, webinar_url) {
  const database = await this._database();
  await database.read();

  database.data.webinars.push({
    webinar: webinar_number,
    url: webinar_url,
  });

  await database.write();
}

async function count() {
  const database = await this._database();
  await database.read();

  const { webinars } = database.data;

  return webinars.length;
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

  if (database.data?.webinars) {
    return;
  }

  database.data ||= { webinars: [] };

  await database.write();
}

const webinar_repository = {
  add,
  fetch,
  count,
  _database,
  _createTable,
};

export default webinar_repository;
