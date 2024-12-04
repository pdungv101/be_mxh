const NotificationService = require("../services/notificationService");

class NotificationController {
  static async createNotification(req, res) {
    const { userId, actionType, referenceId, message } = req.body;
    try {
      const notification = await NotificationService.createNotification(
        userId,
        actionType,
        referenceId,
        message
      );
      res.json({ notificationId: notification.insertId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getNotifications(req, res) {
    const userId = req.user.userId; // Lấy userId từ token
    try {
      const notifications = await NotificationService.getNotificationsByUserId(
        userId
      );
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async markAsRead(req, res) {
    const { notificationId } = req.params;
    try {
      await NotificationService.markNotificationAsRead(notificationId);
      res.json({ message: "Notification marked as read" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = NotificationController;
