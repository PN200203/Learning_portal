const db = require("../database");

// =========================
// Add Bookmark
// =========================
const addBookmark = (req, res) => {
  console.log("📌 Bookmark Request:", req.body);

  const { userId, videoId, bookmarkName, timestamp } = req.body;

  if (
    !userId ||
    !videoId ||
    timestamp === undefined ||
    timestamp === null
  ) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  const sql = `
    INSERT INTO bookmarks
    (userId, videoId, bookmarkName, timestamp)
    VALUES (?, ?, ?, ?)
  `;

  db.run(
    sql,
    [
      Number(userId),
      Number(videoId),
      bookmarkName || "",
      Number(timestamp),
    ],
    function (err) {
      if (err) {
        console.log("❌ Insert Error:", err.message);

        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      console.log("✅ Bookmark Saved. ID:", this.lastID);

      res.status(201).json({
        success: true,
        message: "Bookmark Added Successfully",
        bookmarkId: this.lastID,
      });
    }
  );
};

// =========================
// Get Bookmarks
// =========================
const getBookmarks = (req, res) => {
  const { videoId } = req.params;

  console.log("📖 Fetch Bookmarks For Video:", videoId);

  db.all(
    `
    SELECT *
    FROM bookmarks
    WHERE videoId = ?
    ORDER BY timestamp ASC
    `,
    [Number(videoId)],
    (err, rows) => {
      if (err) {
        console.log("❌ Fetch Error:", err.message);

        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      console.log("✅ Bookmarks Found:", rows.length);

      res.json({
        success: true,
        bookmarks: rows,
      });
    }
  );
};

// =========================
// Delete Bookmark
// =========================
const deleteBookmark = (req, res) => {
  const { id } = req.params;

  db.run(
    `DELETE FROM bookmarks WHERE id = ?`,
    [Number(id)],
    function (err) {
      if (err) {
        console.log("❌ Delete Error:", err.message);

        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          success: false,
          message: "Bookmark Not Found",
        });
      }

      console.log("🗑 Bookmark Deleted");

      res.json({
        success: true,
        message: "Bookmark Deleted Successfully",
      });
    }
  );
};

module.exports = {
  addBookmark,
  getBookmarks,
  deleteBookmark,
};