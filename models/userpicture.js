const db = require("../config/db");

const createUserCoversTable = `CREATE TABLE IF NOT EXISTS UserPictures (
    picture_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    profile_picture VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);`;

db.query(createUserCoversTable, (err) => {
  if (err) {
    console.error("Error creating UserPictures table:", err);
    return;
  }
  console.log("UserPictures table created successfully");
});

class UserPicture {
  static upload(userId, picturePath) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE Users SET profile_picture = ? WHERE user_id = ?";
      db.query(sql, [picturePath, userId], (error, results) => {
        if (error) {
          return reject(
            new Error("Error uploading profile picture: " + error.message)
          );
        }
        resolve(results);
      });
    });
  }

  static remove(userId) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE Users SET profile_picture = NULL WHERE user_id = ?";
      db.query(sql, [userId], (error, results) => {
        if (error) {
          return reject(
            new Error("Error removing profile picture: " + error.message)
          );
        }
        resolve(results);
      });
    });
  }
}

module.exports = UserPicture;
