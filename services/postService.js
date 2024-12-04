const Post = require("../models/post");

class PostService {
  static async createPost(userId, content, mediaUrls) {
    try {
      // Create the post and get the created post ID
      const postId = await Post.create(userId, content);

      // Add media URLs to the created post
      if (mediaUrls && mediaUrls.length > 0) {
        await Promise.all(mediaUrls.map((url) => Post.addMedia(postId, url)));
      }

      // Return the created post with the media URLs
      return {
        post_id: postId,
        user_id: userId,
        content,
        media: mediaUrls || [], // Include media URLs or an empty array if none
      };
    } catch (err) {
      console.error("Error creating post:", err);
      throw err; // Rethrow the error for further handling
    }
  }

  static async getPost(postId) {
    try {
      const post = await Post.findById(postId);
      // Return the post directly, as media is already included in post
      return post;
    } catch (err) {
      console.error("Error fetching post with media:", err);
      throw err; // Rethrow the error for further handling
    }
  }

  static async getAllPosts() {
    try {
      return await Post.findAll();
    } catch (err) {
      console.error("Error fetching all posts:", err);
      throw err; // Rethrow the error for further handling
    }
  }

  // New method to get posts by user ID
  static async getPostsByUserId(userId) {
    try {
      return await Post.findByUserId(userId);
    } catch (err) {
      console.error("Error fetching posts by user ID:", err);
      throw err; // Rethrow the error for further handling
    }
  }

  static async updatePost(postId, userId, content) {
    try {
      const updated = await Post.update(postId, userId, content);
      if (!updated) {
        throw new Error(
          `Post with ID ${postId} not found or not owned by user.`
        );
      }
      return updated; // Return true if updated
    } catch (err) {
      console.error("Error updating post:", err);
      throw err; // Rethrow the error for further handling
    }
  }

  static async deletePost(postId, userId) {
    try {
      const deleted = await Post.delete(postId, userId);
      if (!deleted) {
        throw new Error(
          `Post with ID ${postId} not found or not owned by user.`
        );
      }
      return deleted; // Return true if deleted
    } catch (err) {
      console.error("Error deleting post:", err);
      throw err; // Rethrow the error for further handling
    }
  }

  static async deleteMedia(mediaId) {
    try {
      await Post.deleteMedia(mediaId);
      return { success: true }; // Return success status
    } catch (err) {
      console.error("Error deleting media:", err);
      throw err; // Rethrow the error for further handling
    }
  }
}

module.exports = PostService;
