const CommentLike = require("../models/commentlike");

class CommentLikeService {
  static async likeComment(commentId, userId) {
    try {
      const result = await CommentLike.create(commentId, userId);
      return result; // Return the result of the like operation
    } catch (error) {
      console.error("Error liking comment:", error);
      throw new Error("Could not like the comment."); // Throw a user-friendly error
    }
  }

  static async unlikeComment(commentId, userId) {
    try {
      const result = await CommentLike.delete(commentId, userId);
      return result; // Return the result of the unlike operation
    } catch (error) {
      console.error("Error unliking comment:", error);
      throw new Error("Could not unlike the comment."); // Throw a user-friendly error
    }
  }

  static async getCommentLikeCount(commentId) {
    try {
      const likeCount = await CommentLike.findByCommentId(commentId);
      return likeCount; // Return the like count
    } catch (error) {
      console.error("Error fetching comment like count:", error);
      throw new Error("Could not fetch comment like count."); // Throw a user-friendly error
    }
  }

  static async isCommentLiked(commentId, userId) {
    try {
      const result = await CommentLike.isLiked(commentId, userId);
      return result; // Return the result of the isLiked operation
    } catch (error) {
      console.error("Error checking if comment is liked:", error);
      throw new Error("Could not check if comment is liked."); // Throw a user-friendly error
    }
  }
}

module.exports = CommentLikeService;
