const express = require("express");
const CommentController = require("../controllers/commentController");
const authenticateJWT = require("../middlewares/authMiddleware");
const router = express.Router();

// Route to create a new comment
router.post("/", authenticateJWT, CommentController.createComment);
router.post(
  "/:commentId/replies",
  authenticateJWT,
  CommentController.createReply
);
// Route to get comments for a specific post
router.get("/:postId", CommentController.getComments);

// Route to update a specific comment
router.put("/:id", authenticateJWT, CommentController.updateComment);

// Route to delete a specific comment
router.delete("/:id", authenticateJWT, CommentController.deleteComment);

// Route to get the count of comments for a specific post
router.get("/count/:postId", CommentController.getCommentCount);
router.get("/replies/:parentId", CommentController.getCommentsByParentId);

module.exports = router;
