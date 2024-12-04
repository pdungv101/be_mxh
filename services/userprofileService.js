// services/userProfileService.js
const UserProfile = require("../models/userprofile");
const User = require("../models/user");

class UserProfileService {
  static async createProfile(userId) {
    try {
      return await UserProfile.create(userId);
    } catch (error) {
      throw new Error("Profile creation failed: " + error.message);
    }
  }
  static async updateUser(userId, updates) {
    try {
      await UserProfile.update(userId, updates);
      return await User.findById(userId); // Return updated user data
    } catch (error) {
      throw new Error("Error updating user profile: " + error.message);
    }
  }

  static async fetchProfile(userId) {
    try {
      return await UserProfile.fetchById(userId);
    } catch (error) {
      throw new Error("Error fetching user profile: " + error.message);
    }
  }
}

module.exports = UserProfileService;
