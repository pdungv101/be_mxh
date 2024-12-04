const ReelService = require("../services/reelService");

class ReelController {
  static async createReel(req, res) {
    const { title, description } = req.body;
    const userId = req.user.userId; // Lấy userId từ token
    const mediaUrl = req.file ? req.file.path : null; // Nếu có tệp media

    try {
      const reel = await ReelService.createReel(
        userId,
        title,
        description,
        mediaUrl
      );
      res.status(201).json({ reelId: reel.insertId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllReels(req, res) {
    try {
      const reels = await ReelService.getAllReels();
      res.json(reels);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getReel(req, res) {
    const { reelId } = req.params;
    try {
      const reel = await ReelService.getReelById(reelId);
      if (!reel) {
        return res.status(404).json({ message: "Reel not found" });
      }
      res.json(reel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateReel(req, res) {
    const { reelId } = req.params;
    const { title, description } = req.body;
    const mediaUrl = req.file ? req.file.path : null; // Nếu có tệp media

    try {
      const result = await ReelService.updateReel(
        reelId,
        title,
        description,
        mediaUrl
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Reel not found" });
      }
      res.json({ message: "Reel updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteReel(req, res) {
    const { reelId } = req.params;
    try {
      const result = await ReelService.deleteReel(reelId);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Reel not found" });
      }
      res.json({ message: "Reel deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ReelController;
