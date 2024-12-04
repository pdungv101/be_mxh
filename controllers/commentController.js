// controllers/commentController.js
const CommentService = require("../services/commentService");

class CommentController {
  static async createComment(req, res) {
    const { postId, content } = req.body; // Remove parentId as it is for top-level comments
    const userId = req.user.userId; // Extract userId from the request

    try {
      const comment = await CommentService.createComment(
        postId,
        userId,
        content
      );
      res.status(201).json({ commentId: comment.insertId });
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ error: error.message });
    }
  }

  // Create a reply to a comment
  // Create a reply to a comment
  static async createReply(req, res) {
    const { content } = req.body; // Obtain content from the body
    const { commentId } = req.params; // Extract commentId from the request parameters
    const userId = req.user.userId; // Extract userId from the request

    try {
      // Step 1: Check if the parent comment exists
      const parentComment = await CommentService.getCommentById(commentId);
      if (!parentComment) {
        return res.status(404).json({ error: "Parent comment not found." });
      }

      // Step 2: Create the reply
      const reply = await CommentService.createComment(
        parentComment.post_id, // Extract the postId from the parent comment
        userId, // Use the authenticated user ID
        content, // The content of the reply
        commentId // Use commentId as the parent ID
      );

      // Step 3: Send the response back with the new comment ID
      res.status(201).json({ commentId: reply.insertId });
    } catch (error) {
      console.error("Error creating reply:", error);
      res.status(500).json({ error: error.message });
    }
  }

  static async getComments(req, res) {
    const { postId } = req.params;

    try {
      const comments = await CommentService.getCommentsByPostId(postId);
      res.json(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ error: error.message });
    }
  }

  static async updateComment(req, res) {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.userId;

    try {
      const result = await CommentService.updateComment(id, userId, content);
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "Comment not found or not owned by user" });
      }
      res.json({ message: "Comment updated successfully" });
    } catch (error) {
      console.error("Error updating comment:", error);
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteComment(req, res) {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
      const result = await CommentService.deleteComment(id, userId);
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "Comment not found or not owned by user" });
      }
      res.json({ message: "Comment deleted successfully" });
    } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).json({ error: error.message });
    }
  }

  static async getCommentCount(req, res) {
    const { postId } = req.params;

    try {
      const count = await CommentService.getCommentCountByPostId(postId);
      res.json({ count });
    } catch (error) {
      console.error("Error fetching comment count:", error);
      res.status(500).json({ error: error.message });
    }
  }

  static async getCommentsByParentId(req, res) {
    const { parentId } = req.params;

    try {
      const comments = await CommentService.getCommentByParentId(parentId);
      res.json(comments);
    } catch (error) {
      console.error("Error fetching comments by parent ID:", error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CommentController;
