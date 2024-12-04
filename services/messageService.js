const Message = require("../models/message"); // Adjust import according to your file structure

class MessageService {
  // Create a new message
  static async createMessage(senderId, receiverId, content) {
    if (!senderId || !receiverId || !content) {
      throw new Error("Sender ID, receiver ID, and content are required");
    }

    try {
      const result = await Message.create(senderId, receiverId, content);
      return result; // Return the created message details
    } catch (error) {
      throw new Error(`Failed to create message: ${error.message}`);
    }
  }

  // Retrieve messages by receiver ID
  static async getMessagesByReceiverId(receiverId) {
    if (!receiverId) {
      throw new Error("Receiver ID is required");
    }

    try {
      const messages = await Message.findAllByReceiverId(receiverId);
      return messages; // Return the messages found
    } catch (error) {
      throw new Error(`Failed to fetch messages: ${error.message}`);
    }
  }

  // Update an existing message
  static async updateMessage(messageId, userId, content) {
    if (!messageId || !userId || !content) {
      throw new Error("Message ID, user ID, and content are required");
    }

    try {
      const result = await Message.update(messageId, userId, content);
      return result; // Return the result of the update operation
    } catch (error) {
      throw new Error(`Failed to update message: ${error.message}`);
    }
  }

  // Delete a message
  static async deleteMessage(messageId, userId) {
    if (!messageId || !userId) {
      throw new Error("Message ID and user ID are required");
    }

    try {
      const result = await Message.delete(messageId, userId);
      return result; // Return the result of the delete operation
    } catch (error) {
      throw new Error(`Failed to delete message: ${error.message}`);
    }
  }

  // Retrieve a message by ID
  static async getMessageById(messageId) {
    if (!messageId) {
      throw new Error("Message ID is required");
    }

    try {
      const message = await Message.findById(messageId);
      return message; // Return the found message or null
    } catch (error) {
      throw new Error(`Failed to fetch message by ID: ${error.message}`);
    }
  }

  // Get messages between two users
  static async getMessagesBetweenUsers(senderId, receiverId) {
    if (!senderId || !receiverId) {
      throw new Error("Sender ID and receiver ID are required");
    }

    try {
      const messages = await Message.getMessages(senderId, receiverId);
      return messages; // Return the messages found
    } catch (error) {
      throw new Error(
        `Failed to fetch messages between users: ${error.message}`
      );
    }
  }
  // Trong services/messageService.js
  static async getNewestMessage(senderId, receiverId) {
    if (!senderId || !receiverId) {
      throw new Error("Sender ID and receiver ID are required");
    }

    try {
      const newestMessage = await Message.getNewestMessage(
        senderId,
        receiverId
      );
      return newestMessage; // Trả về tin nhắn mới nhất hoặc null
    } catch (error) {
      throw new Error(`Failed to fetch the newest message: ${error.message}`);
    }
  }
}

module.exports = MessageService;
