// models/follow.js
const db = require("../config/db");

// Create the Follows table if it doesn't exist
const createFollowTable = `CREATE TABLE IF NOT EXISTS Follows (
    follow_id INT AUTO_INCREMENT PRIMARY KEY,
    follower_id INT NOT NULL,
    followed_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (follower_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (followed_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    UNIQUE KEY (follower_id, followed_id) 
);`;

// Execute the table creation query
db.query(createFollowTable, (err, results) => {
  if (err) {
    console.error("Error creating the Follows table:", err);
    return;
  }
  console.log("Follows table created successfully");
});

// Follow model
class Follow {
  // Method to create a follow relationship
  static create(followerId, followedId) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO Follows (follower_id, followed_id) VALUES (?, ?)";
      db.query(sql, [followerId, followedId], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  // Method to delete a follow relationship
  static delete(followerId, followedId) {
    return new Promise((resolve, reject) => {
      const sql =
        "DELETE FROM Follows WHERE follower_id = ? AND followed_id = ?";
      db.query(sql, [followerId, followedId], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  // Method to count followers of a user
  static countFollowers(userId) {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT COUNT(*) as followerCount FROM Follows WHERE followed_id = ?";
      db.query(sql, [userId], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results[0].followerCount); // Return the follower count
      });
    });
  }

  // Method to check if a user is being followed
  static isFollowing(followerId, followedId) {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT COUNT(*) as isFollowing FROM Follows WHERE follower_id = ? AND followed_id = ?";
      db.query(sql, [followerId, followedId], (err, results) => {
        if (err) {
          return reject(err);
        }
        // Return true if the count of isFollowing is greater than 0
        resolve(results[0].isFollowing > 0);
      });
    });
  }

  static getFollowedUsers(userId) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT u.user_id, u.username, u.profile_picture
        FROM Follows f
        JOIN Users u ON f.followed_id = u.user_id
        WHERE f.follower_id = ?
      `;
      db.query(sql, [userId], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }
}

module.exports = Follow;
