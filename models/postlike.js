const db = require("../config/db");

const createPostLikesTable = `CREATE TABLE IF NOT EXISTS PostLikes (
    like_id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES Posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    UNIQUE KEY (post_id, user_id)  -- Ensure a user can like a post only once
);`;

db.query(createPostLikesTable, (err, results) => {
  if (err) {
    console.error("Error creating PostLikes table:", err);
    return;
  }
  console.log("PostLikes table created successfully");
});

class PostLike {
  static create(postId, userId) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO PostLikes (post_id, user_id) VALUES (?, ?)";
      db.query(sql, [postId, userId], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  static delete(postId, userId) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM PostLikes WHERE post_id = ? AND user_id = ?";
      db.query(sql, [postId, userId], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  static findByPostId(postId) {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT COUNT(*) as likeCount FROM PostLikes WHERE post_id = ?";
      db.query(sql, [postId], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results[0].likeCount);
      });
    });
  }

  static isLiked(postId, userId) {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT COUNT(*) as isLiked FROM PostLikes WHERE post_id = ? AND user_id = ?";
      db.query(sql, [postId, userId], (err, results) => {
        if (err) {
          return reject(err);
        }
        // Return true if isLiked count is greater than 0
        resolve(results[0].isLiked > 0);
      });
    });
  }
}

module.exports = PostLike;
