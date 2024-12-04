const PostLikeService = require("../services/postLikeService");

class PostLikeController {
  static async likePost(req, res) {
    const { postId } = req.body;
    const userId = req.user.userId; // Assuming user ID is attached to the request object
    try {
      await PostLikeService.likePost(postId, userId);
      res.json({ message: "Post liked successfully" });
    } catch (error) {
      console.error("Error liking post:", error); // Log error for debugging
      res
        .status(500)
        .json({ error: "Could not like the post. Please try again later." });
    }
  }

  static async unlikePost(req, res) {
    const { postId } = req.body;
    const userId = req.user.userId; // Assuming user ID is attached to the request object
    try {
      await PostLikeService.unlikePost(postId, userId);
      res.json({ message: "Post unliked successfully" });
    } catch (error) {
      console.error("Error unliking post:", error); // Log error for debugging
      res
        .status(500)
        .json({ error: "Could not unlike the post. Please try again later." });
    }
  }

  static async getLikeCount(req, res) {
    const { postId } = req.params;
    try {
      const count = await PostLikeService.getLikeCount(postId);
      res.json({ likeCount: count });
    } catch (error) {
      console.error("Error fetching like count:", error); // Log error for debugging
      res
        .status(500)
        .json({ error: "Could not fetch like count. Please try again later." });
    }
  }

  static async isPostLiked(req, res) {
    const { postId } = req.params;
    const userId = req.user.userId; // Assuming user ID is attached to the request object
    try {
      const isLiked = await PostLikeService.isPostLiked(postId, userId);
      res.json({ isLiked });
    } catch (error) {
      console.error("Error checking if post is liked:", error); // Log error for debugging
      res.status(500).json({
        error: "Could not check if post is liked. Please try again later.",
      });
    }
  }
}

module.exports = PostLikeController;
