const PostService = require("../services/postService");

class PostController {
  static async createPost(req, res) {
    const { content } = req.body;
    const userId = req.user.userId; // Extract userId from token
    const mediaUrls = req.files ? req.files.map((file) => file.path) : []; // Extract media file paths if present

    try {
      const postId = await PostService.createPost(userId, content, mediaUrls);
      res.status(201).json({ postId }); // Return the created post ID
    } catch (error) {
      console.error("Error creating post:", error); // Log the error for debugging
      res.status(500).json({ error: error.message });
    }
  }

  static async getPost(req, res) {
    const { id } = req.params;
    try {
      const postWithMedia = await PostService.getPost(id);
      res.json(postWithMedia); // Return the post with media
    } catch (error) {
      console.error("Error fetching post:", error); // Log the error for debugging
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllPosts(req, res) {
    try {
      const posts = await PostService.getAllPosts();
      res.json(posts); // Return all posts
    } catch (error) {
      console.error("Error fetching all posts:", error); // Log the error for debugging
      res.status(500).json({ error: error.message });
    }
  }

  static async getPostsByUserId(req, res) {
    const { userId } = req.params; // Extract user ID from request parameters
    try {
      const posts = await PostService.getPostsByUserId(userId);
      res.json(posts); // Return posts for the specified user
    } catch (error) {
      console.error("Error fetching posts by user ID:", error); // Log the error for debugging
      res.status(500).json({ error: error.message });
    }
  }

  static async updatePost(req, res) {
    const { id } = req.params;
    const userId = req.user.userId; // Extract userId from token
    const { content } = req.body;

    try {
      const updated = await PostService.updatePost(id, userId, content);
      if (!updated) {
        return res.status(404).json({
          error: `Post with ID ${id} not found or not owned by user.`,
        });
      }
      res.json({ message: "Post updated successfully" }); // Success message
    } catch (error) {
      console.error("Error updating post:", error); // Log the error for debugging
      res.status(500).json({ error: error.message });
    }
  }

  static async deletePost(req, res) {
    const { id } = req.params;
    const userId = req.user.userId; // Extract userId from token
    try {
      const deleted = await PostService.deletePost(id, userId);
      if (!deleted) {
        return res.status(404).json({
          error: `Post with ID ${id} not found or not owned by user.`,
        });
      }
      res.json({ message: "Post deleted successfully" }); // Success message
    } catch (error) {
      console.error("Error deleting post:", error); // Log the error for debugging
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteMedia(req, res) {
    const { mediaId } = req.params;
    try {
      await PostService.deleteMedia(mediaId);
      res.json({ message: "Media deleted successfully" }); // Success message
    } catch (error) {
      console.error("Error deleting media:", error); // Log the error for debugging
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PostController;
