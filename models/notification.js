const db = require("../config/db");

const createNotificationsTable = `CREATE TABLE IF NOT EXISTS Notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action_type ENUM('like_post', 'comment_post', 'send_message', 'friend_request') NOT NULL,
    reference_id INT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);`;
db.query(createNotificationsTable, (err, results) => {
  if (err) {
    console.error("Error creating Notifications table:", err);
    return;
  }
  console.log("Notifications table created successfully");
});
class Notification {
  static async create(userId, actionType, referenceId, message) {
    const sql =
      "INSERT INTO Notifications (user_id, action_type, reference_id, message) VALUES (?, ?, ?, ?)";
    const [results] = await db.query(sql, [
      userId,
      actionType,
      referenceId,
      message,
    ]);
    return results;
  }

  static async findByUserId(userId) {
    const sql =
      "SELECT * FROM Notifications WHERE user_id = ? ORDER BY created_at DESC";
    const [results] = await db.query(sql, [userId]);
    return results;
  }

  static async markAsRead(notificationId) {
    const sql =
      "UPDATE Notifications SET is_read = ? WHERE notification_id = ?";
    const [results] = await db.query(sql, [true, notificationId]);
    return results;
  }
}

module.exports = Notification;
