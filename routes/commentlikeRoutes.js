// routes/commentLikeRoutes.js
const express = require("express");
const CommentLikeController = require("../controllers/commentLikeController");
const authenticateJWT = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authenticateJWT, CommentLikeController.likeComment);
router.delete("/", authenticateJWT, CommentLikeController.unlikeComment);
router.get("/:commentId", CommentLikeController.getCommentLikeCount);
router.get(
  "/:commentId/isLiked",
  authenticateJWT,
  CommentLikeController.isCommentLiked
);

module.exports = router;
