const MessageService = require("../services/messageService"); // Adjust the path according to your project's structure

class MessageController {
  // Handle sending a message
  static async sendMessage(req, res) {
    const { senderId, receiverId, content } = req.body;

    try {
      const result = await MessageService.createMessage(
        senderId,
        receiverId,
        content
      );
      return res.status(201).json({
        message: "Message created successfully",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  // Handle fetching messages by receiver ID
  static async fetchMessages(req, res) {
    const { receiverId } = req.params;

    try {
      const messages = await MessageService.getMessagesByReceiverId(receiverId);
      return res.status(200).json({
        message: "Messages fetched successfully",
        data: messages,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  // Handle updating a message
  static async updateMessage(req, res) {
    const { messageId } = req.params;
    const { userId, content } = req.body;

    try {
      const result = await MessageService.updateMessage(
        messageId,
        userId,
        content
      );
      return res.status(200).json({
        message: "Message updated successfully",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  // Handle deleting a message
  static async deleteMessage(req, res) {
    const { messageId } = req.params;
    const { userId } = req.body;

    try {
      const result = await MessageService.deleteMessage(messageId, userId);
      return res.status(200).json({
        message: "Message deleted successfully",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  // Handle fetching a message by ID
  static async fetchMessageById(req, res) {
    const { messageId } = req.params;

    try {
      const message = await MessageService.getMessageById(messageId);
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }
      return res.status(200).json({
        message: "Message fetched successfully",
        data: message,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  static async getMessages(req, res) {
    const { senderId, receiverId } = req.params;

    try {
      const messages = await MessageService.getMessagesBetweenUsers(
        senderId,
        receiverId
      );
      return res.json({
        message: "Messages fetched successfully",
        data: messages,
      });
    } catch (error) {
      console.error("Error fetching messages:", error);
      return res.status(500).json({ message: "Error fetching messages" });
    }
  }

  // Handle fetching the newest message for a specific receiver
  // Trong controllers/messageController.js
  static async fetchNewestMessage(req, res) {
    const { senderId, receiverId } = req.params;

    try {
      const newestMessage = await MessageService.getNewestMessage(
        senderId,
        receiverId
      );
      if (!newestMessage) {
        return res.status(404).json({ error: "No messages found." });
      }
      return res.status(200).json({
        message: "Newest message fetched successfully",
        data: newestMessage,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}

module.exports = MessageController;
