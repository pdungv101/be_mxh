// controllers/followController.js
const FollowService = require("../services/followService");

class FollowController {
  // Method to follow a user
  static async followUser(req, res) {
    const { followedId } = req.body; // ID of the user to follow
    const followerId = req.user.userId; // Assuming the user's ID is in the request object
    try {
      await FollowService.followUser(followerId, followedId);
      res.json({ message: "User followed successfully" });
    } catch (error) {
      console.error("Error following user:", error); // Log the error for debugging
      res
        .status(500)
        .json({ error: "Could not follow the user. Please try again later." });
    }
  }

  // Method to unfollow a user
  static async unfollowUser(req, res) {
    const { followedId } = req.body; // ID of the user to unfollow
    const followerId = req.user.userId; // Assuming the user's ID is in the request object
    try {
      await FollowService.unfollowUser(followerId, followedId);
      res.json({ message: "User unfollowed successfully" });
    } catch (error) {
      console.error("Error unfollowing user:", error); // Log the error for debugging
      res.status(500).json({
        error: "Could not unfollow the user. Please try again later.",
      });
    }
  }

  // Method to get the follower count of a user
  static async getFollowerCount(req, res) {
    const { userId } = req.params; // ID of the user to count followers
    try {
      const count = await FollowService.getFollowerCount(userId);
      res.json({ followerCount: count });
    } catch (error) {
      console.error("Error fetching follower count:", error); // Log the error for debugging
      res.status(500).json({
        error: "Could not fetch follower count. Please try again later.",
      });
    }
  }

  // Method to check if a user is followed
  static async isUserFollowed(req, res) {
    const { followedId } = req.params; // ID of the user to check
    const followerId = req.user.userId; // Assuming the user's ID is in the request object
    try {
      const isFollowed = await FollowService.isUserFollowed(
        followerId,
        followedId
      );
      res.json({ isFollowed });
    } catch (error) {
      console.error("Error checking if user is followed:", error); // Log the error for debugging
      res.status(500).json({
        error: "Could not check if user is followed. Please try again later.",
      });
    }
  }

  // Method to get the followed users of a user
  static async getFollowedUsers(req, res) {
    const { userId } = req.params; // ID of the user to fetch followed users
    try {
      const followedUsers = await FollowService.getFollowedUsers(userId);
      res.json({ followedUsers });
    } catch (error) {
      console.error("Error fetching followed users:", error); // Log the error for debugging
      res.status(500).json({
        error: "Could not fetch followed users. Please try again later.",
      });
    }
  }
}

module.exports = FollowController;
