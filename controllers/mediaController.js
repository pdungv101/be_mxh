const MessageService = require("../services/messageService");

class MessageController {
  static async sendMessage(req, res) {
    const { receiverId, content } = req.body;
    const senderId = req.user.userId; // Lấy userId từ token
    try {
      const message = await MessageService.sendMessage(
        senderId,
        receiverId,
        content
      );
      res.json({ messageId: message.insertId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getMessages(req, res) {
    const receiverId = req.user.userId; // Lấy userId từ token
    try {
      const messages = await MessageService.getMessagesByReceiverId(receiverId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = MessageController;
