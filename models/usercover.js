const db = require("../config/db");

const createUserCoversTable = `CREATE TABLE IF NOT EXISTS UserCovers (
    cover_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    cover_path VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);`;

db.query(createUserCoversTable, (err) => {
  if (err) {
    console.error("Error creating UserCovers table:", err);
    return;
  }
  console.log("UserCovers table created successfully");
});

class UserCover {
  static upload(userId, coverPath) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE Users SET cover_picture = ? WHERE user_id = ?";
      db.query(sql, [coverPath, userId], (error, results) => {
        if (error) {
          return reject(
            new Error("Error uploading cover picture: " + error.message)
          );
        }
        resolve(results);
      });
    });
  }

  static remove(userId) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE Users SET cover_picture = NULL WHERE user_id = ?";
      db.query(sql, [userId], (error, results) => {
        if (error) {
          return reject(
            new Error("Error removing cover picture: " + error.message)
          );
        }
        resolve(results);
      });
    });
  }
}

module.exports = UserCover;
