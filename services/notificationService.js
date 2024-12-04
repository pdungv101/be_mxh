const Notification = require("../models/notification");

class NotificationService {
  static async createNotification(userId, actionType, referenceId, message) {
    return Notification.create(userId, actionType, referenceId, message);
  }

  static async getNotificationsByUserId(userId) {
    return Notification.findByUserId(userId);
  }

  static async markNotificationAsRead(notificationId) {
    return Notification.markAsRead(notificationId);
  }
}

module.exports = NotificationService;
