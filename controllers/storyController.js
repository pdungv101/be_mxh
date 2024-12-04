const StoryService = require("../services/storyService");

class StoryController {
  static async createStory(req, res) {
    const { content } = req.body;
    const userId = req.user.userId; // Lấy userId từ token
    const mediaUrl = req.file ? req.file.path : null; // Nếu có tệp media

    try {
      const story = await StoryService.createStory(userId, content, mediaUrl);
      res.status(201).json({ storyId: story.insertId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllStories(req, res) {
    try {
      const stories = await StoryService.getAllStories();
      res.json(stories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getStory(req, res) {
    const { storyId } = req.params;
    try {
      const story = await StoryService.getStoryById(storyId);
      if (!story) {
        return res.status(404).json({ message: "Story not found" });
      }
      res.json(story);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateStory(req, res) {
    const { storyId } = req.params;
    const { content } = req.body;
    const mediaUrl = req.file ? req.file.path : null; // Nếu có tệp media

    try {
      const result = await StoryService.updateStory(storyId, content, mediaUrl);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Story not found" });
      }
      res.json({ message: "Story updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteStory(req, res) {
    const { storyId } = req.params;
    try {
      const result = await StoryService.deleteStory(storyId);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Story not found" });
      }
      res.json({ message: "Story deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = StoryController;
