const db = require("../database");

// Get all videos
const getAllVideos = (req, res) => {
  db.all(
    "SELECT * FROM videos ORDER BY id DESC",
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.json({
        success: true,
        videos: rows,
      });
    }
  );
};

// Get video by ID
const getVideoById = (req, res) => {
  const { id } = req.params;

  db.get(
    "SELECT * FROM videos WHERE id=?",
    [id],
    (err, row) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      if (!row) {
        return res.status(404).json({
          success: false,
          message: "Video not found",
        });
      }

      res.json({
        success: true,
        video: row,
      });
    }
  );
};

module.exports = {
  getAllVideos,
  getVideoById,
};