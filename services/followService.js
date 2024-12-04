const Follow = require("../models/follow");

class FollowService {
  static async followUser(followerId, followedId) {
    try {
      const result = await Follow.create(followerId, followedId);
      return result; // Returns the result of the follow operation
    } catch (error) {
      console.error("Error following the user:", error);
      throw new Error("Could not follow the user."); // User-friendly error message
    }
  }

  static async unfollowUser(followerId, followedId) {
    try {
      const result = await Follow.delete(followerId, followedId);
      return result; // Returns the result of the unfollow operation
    } catch (error) {
      console.error("Error unfollowing the user:", error);
      throw new Error("Could not unfollow the user."); // User-friendly error message
    }
  }

  static async getFollowerCount(userId) {
    try {
      const followerCount = await Follow.countFollowers(userId);
      return followerCount; // Returns the follower count
    } catch (error) {
      console.error("Error getting the follower count:", error);
      throw new Error("Could not get the follower count."); // User-friendly error message
    }
  }

  static async isUserFollowed(followerId, followedId) {
    try {
      const result = await Follow.isFollowing(followerId, followedId);
      return result; // Returns the result of the isFollowing operation
    } catch (error) {
      console.error("Error checking if the user is followed:", error);
      throw new Error("Could not verify if the user is followed."); // User-friendly error message
    }
  }

  static async getFollowedUsers(userId) {
    try {
      const followedUsers = await Follow.getFollowedUsers(userId);
      return followedUsers; // Returns the followed users
    } catch (error) {
      console.error("Error getting the followed users:", error);
      throw new Error("Could not get the followed users."); // User-friendly error message
    }
  }
}

module.exports = FollowService;
