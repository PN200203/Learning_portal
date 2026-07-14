const db = require("../database");

// Add Bookmark
const addBookmark = (req, res) => {
  const { userId, videoId, bookmarkName, timestamp } = req.body;

  if (!userId || !videoId || timestamp === undefined) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields"
    });
  }

  const query = `
    INSERT INTO bookmarks
    (userId, videoId, bookmarkName, timestamp)
    VALUES (?, ?, ?, ?)
  `;

  db.run(
    query,
    [userId, videoId, bookmarkName || "", timestamp],
    function (err) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }

      res.status(201).json({
        success: true,
        message: "Bookmark Added",
        bookmarkId: this.lastID
      });
    }
  );
};

// Get Bookmarks by Video
const getBookmarks = (req, res) => {
  const { videoId } = req.params;

  db.all(
    `SELECT * FROM bookmarks
     WHERE videoId = ?
     ORDER BY timestamp ASC`,
    [videoId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }

      res.json({
        success: true,
        bookmarks: rows
      });
    }
  );
};

// Delete Bookmark
const deleteBookmark = (req, res) => {
  const { id } = req.params;

  db.run(
    `DELETE FROM bookmarks WHERE id = ?`,
    [id],
    function (err) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          success: false,
          message: "Bookmark not found"
        });
      }

      res.json({
        success: true,
        message: "Bookmark Deleted"
      });
    }
  );
};

module.exports = {
  addBookmark,
  getBookmarks,
  deleteBookmark
};