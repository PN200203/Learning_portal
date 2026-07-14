const express = require("express");

const router = express.Router();

const {
  getAllVideos,
  getVideoById,
} = require("../controllers/videoController");

router.get("/", getAllVideos);

router.get("/:id", getVideoById);

module.exports = router;