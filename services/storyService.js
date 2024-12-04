const Story = require("../models/story");

class StoryService {
  static async createStory(userId, content, mediaUrl) {
    return Story.create(userId, content, mediaUrl);
  }

  static async getAllStories() {
    return Story.findAll();
  }

  static async getStoryById(storyId) {
    return Story.findById(storyId);
  }

  static async updateStory(storyId, content, mediaUrl) {
    return Story.update(storyId, content, mediaUrl);
  }

  static async deleteStory(storyId) {
    return Story.delete(storyId);
  }
}

module.exports = StoryService;
