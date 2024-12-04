const UserCover = require("../models/usercover");

class UserCoverService {
  static async uploadCoverPicture(userId, coverPath) {
    try {
      return await UserCover.upload(userId, coverPath); // Assuming User model has this method
    } catch (error) {
      throw new Error("Error uploading cover picture: " + error.message);
    }
  }

  static async removeCoverPicture(userId) {
    try {
      return await UserCover.remove(userId); // Assuming User model has this method
    } catch (error) {
      throw new Error("Error removing cover picture: " + error.message);
    }
  }
}

module.exports = UserCoverService;
