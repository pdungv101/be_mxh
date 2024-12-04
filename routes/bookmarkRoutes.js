const express = require("express");
const BookmarkController = require("../controllers/bookmarkController");
const authenticateJWT = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authenticateJWT, BookmarkController.createBookmark);
router.get("/", authenticateJWT, BookmarkController.getAllBookmarks);
router.get("/:bookmarkId", authenticateJWT, BookmarkController.getBookmark);
router.put("/:bookmarkId", authenticateJWT, BookmarkController.updateBookmark);
router.delete(
  "/:bookmarkId",
  authenticateJWT,
  BookmarkController.deleteBookmark
);

module.exports = router;
