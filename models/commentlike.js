const db = require("../config/db");

const createCommentLikesTable = `CREATE TABLE IF NOT EXISTS CommentLikes (
    like_id INT AUTO_INCREMENT PRIMARY KEY,
    comment_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (comment_id) REFERENCES Comments(comment_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    UNIQUE KEY (comment_id, user_id)  -- Ensure a user can like a comment only once
);`;

db.query(createCommentLikesTable, (err, results) => {
  if (err) {
    console.error("Error creating CommentLikes table:", err);
    return;
  }
  console.log("CommentLikes table created successfully");
});

class CommentLike {
  static create(commentId, userId) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO CommentLikes (comment_id, user_id) VALUES (?, ?)";
      db.query(sql, [commentId, userId], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  static delete(commentId, userId) {
    return new Promise((resolve, reject) => {
      const sql =
        "DELETE FROM CommentLikes WHERE comment_id = ? AND user_id = ?";
      db.query(sql, [commentId, userId], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  static findByCommentId(commentId) {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT COUNT(*) as likeCount FROM CommentLikes WHERE comment_id = ?";
      db.query(sql, [commentId], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results[0].likeCount);
      });
    });
  }

  static isLiked(commentId, userId) {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT COUNT(*) as isLiked FROM CommentLikes WHERE comment_id = ? AND user_id = ?";
      db.query(sql, [commentId, userId], (err, results) => {
        if (err) {
          return reject(err);
        }
        // Return true if isLiked count is greater than 0
        resolve(results[0].isLiked > 0);
      });
    });
  }
}

module.exports = CommentLike;
