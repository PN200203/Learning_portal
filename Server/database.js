const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "learning.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.log("❌ Database Connection Error:", err.message);
  } else {
    console.log("✅ Connected to SQLite Database");
  }
});

db.serialize(() => {
  // ===========================
  // Users Table
  // ===========================
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ===========================
  // Videos Table
  // ===========================
  db.run(`
    CREATE TABLE IF NOT EXISTS videos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      videoUrl TEXT NOT NULL,
      thumbnail TEXT,
      duration TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ===========================
  // Bookmarks Table
  // ===========================
  db.run(`
    CREATE TABLE IF NOT EXISTS bookmarks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      videoId INTEGER,
      bookmarkName TEXT,
      timestamp INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(userId) REFERENCES users(id),
      FOREIGN KEY(videoId) REFERENCES videos(id)
    )
  `);

  console.log("✅ Database Tables Ready");

  // ===========================
  // Insert Sample Videos
db.get("SELECT COUNT(*) AS count FROM videos", (err, row) => {
  if (err) {
    console.log("Count Error:", err.message);
    return;
  }

  console.log("Video Count =", row.count);

  if (row.count === 0) {
    console.log("Inserting Sample Videos...");

    const stmt = db.prepare(`
      INSERT INTO videos
      (title, description, videoUrl, thumbnail, duration)
      VALUES (?, ?, ?, ?, ?)
    `);

    // HTML
    stmt.run(
      "HTML Crash Course",
      "Learn HTML from Scratch",
      "https://www.youtube.com/watch?v=SqcY0GlETPk",
      "https://img.youtube.com/vi/SqcY0GlETPk/hqdefault.jpg",
      "2 Hours"
    );

    // CSS
    stmt.run(
      "CSS Full Course",
      "Complete CSS Tutorial",
      "https://www.youtube.com/watch?v=JvENsHqWXfw",
      "https://img.youtube.com/vi/JvENsHqWXfw/hqdefault.jpg",
      "3 Hours"
    );

    // JavaScript
    stmt.run(
      "JavaScript Tutorial",
      "Learn JavaScript from Scratch",
      "https://www.youtube.com/watch?v=s2skans2dP4",
      "https://img.youtube.com/vi/s2skans2dP4/hqdefault.jpg",
      "4 Hours"
    );

    // React
    stmt.run(
      "React JS Course",
      "React for Beginners",
      "https://www.youtube.com/watch?v=bxuYDT-BWaI",
      "https://img.youtube.com/vi/bxuYDT-BWaI/hqdefault.jpg",
      "5 Hours"
    );

    // MERN Stack
    stmt.run(
      "MERN Stack Course",
      "Complete MERN Stack Development",
      "https://www.youtube.com/watch?v=UXA8MJUWUqU",
      "https://img.youtube.com/vi/UXA8MJUWUqU/hqdefault.jpg",
      "8 Hours"
    );

    stmt.finalize((err) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log("✅ Sample Videos Inserted");
      }
    });
  }
});
});

module.exports = db;