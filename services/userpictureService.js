// services/userPictureService.js
const UserPicture = require("../models/userpicture");

class UserPictureService {
  static async uploadProfilePicture(userId, picturePath) {
    try {
      return await UserPicture.upload(userId, picturePath);
    } catch (error) {
      throw new Error("Error uploading profile picture: " + error.message);
    }
  }

  static async removeProfilePicture(userId) {
    try {
      return await UserPicture.remove(userId);
    } catch (error) {
      throw new Error("Error removing profile picture: " + error.message);
    }
  }
}

module.exports = UserPictureService;
