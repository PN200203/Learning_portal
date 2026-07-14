const express = require("express");

const router = express.Router();

const {
  addBookmark,
  getBookmarks,
  deleteBookmark,
} = require("../controllers/bookmarkController");

router.post("/", addBookmark);

router.get("/:videoId", getBookmarks);

router.delete("/:id", deleteBookmark);

module.exports = router;