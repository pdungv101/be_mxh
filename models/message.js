const db = require("../config/db");

// SQL to create the Messages table
const createMessagesTable = `CREATE TABLE IF NOT EXISTS Messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES Users(user_id) ON DELETE CASCADE
);`;

// Create Messages table
db.query(createMessagesTable, (err) => {
  if (err) {
    console.error("Error creating Messages table:", err);
    return;
  }
  console.log("Messages table created successfully");
});

class Message {
  // Create a message
  static create(senderId, receiverId, content) {
    const sql =
      "INSERT INTO Messages (sender_id, receiver_id, content) VALUES (?, ?, ?)";
    return new Promise((resolve, reject) => {
      db.query(sql, [senderId, receiverId, content], (err, results) => {
        if (err) {
          console.error("Error creating message:", err);
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  // Find all messages by receiver ID
  static findAllByReceiverId(receiverId) {
    const sql = `SELECT Messages.*, Users.username AS sender_username 
                 FROM Messages 
                 JOIN Users ON Messages.sender_id = Users.user_id 
                 WHERE Messages.receiver_id = ? 
                 ORDER BY Messages.created_at DESC`;
    return new Promise((resolve, reject) => {
      db.query(sql, [receiverId], (err, results) => {
        if (err) {
          console.error("Error fetching messages:", err);
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  // Update a message
  static update(messageId, userId, content) {
    const sql =
      "UPDATE Messages SET content = ? WHERE message_id = ? AND sender_id = ?";
    return new Promise((resolve, reject) => {
      db.query(sql, [content, messageId, userId], (err, results) => {
        if (err) {
          console.error("Error updating message:", err);
          return reject(err);
        }
        if (results.affectedRows === 0) {
          return reject(new Error("Message not found or not owned by user"));
        }
        resolve(results);
      });
    });
  }

  // Delete a message
  static delete(messageId, userId) {
    const sql = "DELETE FROM Messages WHERE message_id = ? AND sender_id = ?";
    return new Promise((resolve, reject) => {
      db.query(sql, [messageId, userId], (err, results) => {
        if (err) {
          console.error("Error deleting message:", err);
          return reject(err);
        }
        if (results.affectedRows === 0) {
          return reject(new Error("Message not found or not owned by user"));
        }
        resolve(results);
      });
    });
  }

  // Find a message by ID
  static findById(messageId) {
    const sql = "SELECT * FROM Messages WHERE message_id = ?";
    return new Promise((resolve, reject) => {
      db.query(sql, [messageId], (err, results) => {
        if (err) {
          console.error("Error fetching message by ID:", err);
          return reject(err);
        }
        resolve(results[0] || null); // Return null if no message found
      });
    });
  }

  // models/messageModel.js
  static async getMessages(senderId, receiverId) {
    // console.log(
    //   `Getting messages for senderId: ${senderId}, receiverId: ${receiverId}`
    // );
    const query = `
      SELECT m.*, 
             u1.user_id AS sender_id, 
             u1.username AS sender_username, 
             u2.user_id AS receiver_id, 
             u2.username AS receiver_username
      FROM messages m
      LEFT JOIN users u1 ON m.sender_id = u1.user_id
      LEFT JOIN users u2 ON m.receiver_id = u2.user_id
      WHERE (m.sender_id = ? AND m.receiver_id = ?) 
         OR (m.sender_id = ? AND m.receiver_id = ?) 
      ORDER BY m.created_at ASC
  `;
    return new Promise((resolve, reject) => {
      db.query(
        query,
        [senderId, receiverId, receiverId, senderId],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          console.log(results); // Log the results for debugging
          return resolve(results);
        }
      );
    });
  }
  // Trong models/message.js
  static getNewestMessage(senderId, receiverId) {
    const sql = `SELECT Messages.*, Users.username AS sender_username 
               FROM Messages 
               JOIN Users ON Messages.sender_id = Users.user_id 
               WHERE (Messages.sender_id = ? AND Messages.receiver_id = ?) 
                  OR (Messages.sender_id = ? AND Messages.receiver_id = ?) 
               ORDER BY Messages.created_at DESC 
               LIMIT 1`;
    return new Promise((resolve, reject) => {
      db.query(
        sql,
        [senderId, receiverId, receiverId, senderId],
        (err, results) => {
          if (err) {
            console.error("Error fetching the newest message:", err);
            return reject(err);
          }
          resolve(results[0] || null); // Trả về null nếu không tìm thấy tin nhắn
        }
      );
    });
  }
}

module.exports = Message;
