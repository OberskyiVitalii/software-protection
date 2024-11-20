const sqlite3 = require("sqlite3").verbose();

const path = require("path");
const dbPath = path.resolve(__dirname, "../database.sqlite3");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error("Помилка підключення до бази даних:", err.message);
  else console.log("Підключено до бази даних SQLite.");
});

db.serialize(() => {
  db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            login TEXT UNIQUE,
            email TEXT UNIQUE,
            password TEXT,
            description TEXT
        )
    `);
});

module.exports = db;
