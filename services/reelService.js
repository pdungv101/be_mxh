const Reel = require("../models/reel");

class ReelService {
  static async createReel(userId, title, description, mediaUrl) {
    return Reel.create(userId, title, description, mediaUrl);
  }

  static async getAllReels() {
    return Reel.findAll();
  }

  static async getReelById(reelId) {
    return Reel.findById(reelId);
  }

  static async updateReel(reelId, title, description, mediaUrl) {
    return Reel.update(reelId, title, description, mediaUrl);
  }

  static async deleteReel(reelId) {
    return Reel.delete(reelId);
  }
}

module.exports = ReelService;
