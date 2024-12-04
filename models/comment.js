const db = require("../config/db");

const createCommentsTable = `CREATE TABLE IF NOT EXISTS Comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    parent_id INT DEFAULT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES Posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES comments(comment_id) ON DELETE CASCADE
);`;

// Create Comments table
db.query(createCommentsTable, (err) => {
  if (err) {
    console.error("Error creating Comments table:", err);
    return;
  }
  console.log("Comments table created successfully");
});

class Comment {
  static create(postId, userId, content, parentId = null) {
    const sql =
      "INSERT INTO Comments (post_id, user_id, content, parent_id) VALUES (?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
      db.query(sql, [postId, userId, content, parentId], (err, results) => {
        if (err) {
          console.error("Error creating comment:", err);
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  static findAllByPostId(postId) {
    const sql = ` SELECT Comments.*, Users.username 
                  FROM Comments 
                  JOIN Users ON Comments.user_id = Users.user_id 
                  WHERE Comments.post_id = ? 
                  ORDER BY Comments.created_at DESC`;
    return new Promise((resolve, reject) => {
      db.query(sql, [postId], (err, results) => {
        if (err) {
          console.error("Error fetching comments:", err);
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  static update(commentId, userId, content) {
    const sql =
      "UPDATE Comments SET content = ? WHERE comment_id = ? AND user_id = ?";
    return new Promise((resolve, reject) => {
      db.query(sql, [content, commentId, userId], (err, results) => {
        if (err) {
          console.error("Error updating comment:", err);
          return reject(err);
        }
        if (results.affectedRows === 0) {
          return reject(new Error("Comment not found or not owned by user"));
        }
        resolve(results);
      });
    });
  }

  static delete(commentId, userId) {
    const sql = "DELETE FROM Comments WHERE comment_id = ? AND user_id = ?";
    return new Promise((resolve, reject) => {
      db.query(sql, [commentId, userId], (err, results) => {
        if (err) {
          console.error("Error deleting comment:", err);
          return reject(err);
        }
        if (results.affectedRows === 0) {
          return reject(new Error("Comment not found or not owned by user"));
        }
        resolve(results);
      });
    });
  }

  static getById(commentId) {
    const sql = "SELECT * FROM Comments WHERE comment_id = ?";
    return new Promise((resolve, reject) => {
      db.query(sql, [commentId], (err, results) => {
        if (err) {
          console.error("Error fetching comment by ID:", err);
          return reject(err);
        }
        resolve(results[0] || null); // Return null if no comment found
      });
    });
  }

  static findById(commentId) {
    const sql = "SELECT * FROM Comments WHERE comment_id = ?";
    return new Promise((resolve, reject) => {
      db.query(sql, [commentId], (err, results) => {
        if (err) {
          console.error("Error fetching comment by ID:", err);
          return reject(err);
        }
        resolve(results[0] || null); // Return null if no comment found
      });
    });
  }

  static findAllByParentId(parentId) {
    const sql = `SELECT Comments.*, Users.username 
                FROM Comments 
                JOIN Users ON Comments.user_id = Users.user_id 
                WHERE Comments.parent_id = ? 
                ORDER BY Comments.created_at DESC`;

    return new Promise((resolve, reject) => {
      db.query(sql, [parentId], (err, results) => {
        if (err) {
          console.error("Error fetching replies:", err);
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  static countByPostId(postId) {
    const sql = "SELECT COUNT(*) AS count FROM Comments WHERE post_id = ?";
    return new Promise((resolve, reject) => {
      db.query(sql, [postId], (err, results) => {
        if (err) {
          console.error("Error counting comments:", err);
          return reject(err);
        }
        resolve(results[0].count); // Return the count of comments
      });
    });
  }
}

module.exports = Comment;
