const PostLike = require("../models/postlike");

class PostLikeService {
  static async likePost(postId, userId) {
    try {
      const result = await PostLike.create(postId, userId);
      return result; // Return the result of the like operation
    } catch (error) {
      console.error("Error liking post:", error);
      throw new Error("Could not like the post."); // Throw a user-friendly error
    }
  }

  static async unlikePost(postId, userId) {
    try {
      const result = await PostLike.delete(postId, userId);
      return result; // Return the result of the unlike operation
    } catch (error) {
      console.error("Error unliking post:", error);
      throw new Error("Could not unlike the post."); // Throw a user-friendly error
    }
  }

  static async getLikeCount(postId) {
    try {
      const likeCount = await PostLike.findByPostId(postId);
      return likeCount; // Return the like count
    } catch (error) {
      console.error("Error fetching like count:", error);
      throw new Error("Could not fetch like count."); // Throw a user-friendly error
    }
  }

  static async isPostLiked(postId, userId) {
    try {
      const result = await PostLike.isLiked(postId, userId);
      return result; // Return the result of the isLiked operation
    } catch (error) {
      console.error("Error checking if post is liked:", error);
      throw new Error("Could not check if post is liked."); // Throw a user-friendly error
    }
  }
}

module.exports = PostLikeService;
