const CommentLikeService = require("../services/commentLikeService");

class CommentLikeController {
  static async likeComment(req, res) {
    const { commentId } = req.body;
    const userId = req.user.userId; // Assuming user ID is attached to the request object
    try {
      await CommentLikeService.likeComment(commentId, userId);
      res.json({ message: "Comment liked successfully" });
    } catch (error) {
      console.error("Error liking comment:", error); // Log error for debugging
      res
        .status(500)
        .json({ error: "Could not like the comment. Please try again later." });
    }
  }

  static async unlikeComment(req, res) {
    const { commentId } = req.body;
    const userId = req.user.userId; // Assuming user ID is attached to the request object
    try {
      await CommentLikeService.unlikeComment(commentId, userId);
      res.json({ message: "Comment unliked successfully" });
    } catch (error) {
      console.error("Error unliking comment:", error); // Log error for debugging
      res
        .status(500)
        .json({
          error: "Could not unlike the comment. Please try again later.",
        });
    }
  }

  static async getCommentLikeCount(req, res) {
    const { commentId } = req.params;
    try {
      const count = await CommentLikeService.getCommentLikeCount(commentId);
      res.json({ likeCount: count });
    } catch (error) {
      console.error("Error fetching comment like count:", error); // Log error for debugging
      res
        .status(500)
        .json({
          error: "Could not fetch comment like count. Please try again later.",
        });
    }
  }

  static async isCommentLiked(req, res) {
    const { commentId } = req.params;
    const userId = req.user.userId; // Assuming user ID is attached to the request object
    try {
      const isLiked = await CommentLikeService.isCommentLiked(
        commentId,
        userId
      );
      res.json({ isLiked });
    } catch (error) {
      console.error("Error checking if comment is liked:", error); // Log error for debugging
      res.status(500).json({
        error: "Could not check if comment is liked. Please try again later.",
      });
    }
  }
}

module.exports = CommentLikeController;
