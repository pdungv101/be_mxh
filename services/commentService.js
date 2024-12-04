// services/commentService.js
const Comment = require("../models/comment");

class CommentService {
  static async createComment(postId, userId, content, parentId = null) {
    try {
      const result = await Comment.create(postId, userId, content, parentId);
      return result;
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error; // Re-throw the error for further handling if needed
    }
  }

  static async getCommentsByPostId(postId) {
    try {
      const comments = await Comment.findAllByPostId(postId);
      return comments;
    } catch (error) {
      console.error("Error fetching comments:", error);
      throw error;
    }
  }

  static async getCommentById(commentId) {
    try {
      const comment = await Comment.findById(commentId);
      return comment;
    } catch (error) {
      console.error("Error fetching comment by ID:", error);
      throw error;
    }
  }

  static async getCommentByParentId(parentId) {
    try {
      const comments = await Comment.findAllByParentId(parentId);
      return comments;
    } catch (error) {
      console.error("Error fetching comments:", error);
      throw error;
    }
  }

  static async updateComment(commentId, userId, content) {
    try {
      const result = await Comment.update(commentId, userId, content);
      return result;
    } catch (error) {
      console.error("Error updating comment:", error);
      throw error;
    }
  }

  static async deleteComment(commentId, userId) {
    try {
      const result = await Comment.delete(commentId, userId);
      return result;
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw error;
    }
  }

  static async getCommentCountByPostId(postId) {
    try {
      const count = await Comment.countByPostId(postId);
      return count;
    } catch (error) {
      console.error("Error counting comments:", error);
      throw error;
    }
  }
}

module.exports = CommentService;
