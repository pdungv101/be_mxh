const db = require("../config/db");

const createUserProfilesTable = `CREATE TABLE IF NOT EXISTS UserProfiles (
    profile_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    full_name VARCHAR(100),
    bio TEXT,
    location VARCHAR(100),
    website VARCHAR(255),
    date_of_birth DATE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);`;

db.query(createUserProfilesTable, (err) => {
  if (err) {
    console.error("Error creating UserProfiles table:", err);
    return;
  }
  console.log("UserProfiles table created successfully");
});

class UserProfile {
  static async create(userId) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO UserProfiles (user_id, full_name, bio, location, website, date_of_birth)
        VALUES (?, NULL, NULL, NULL, NULL, NULL)`;

      db.query(sql, [userId], (error, results) => {
        if (error) {
          return reject(
            new Error("Error creating user profile: " + error.message)
          );
        }
        resolve(results);
      });
    });
  }
  static update(userId, updates) {
    const {
      // username,
      // email,
      full_name,
      bio,
      location,
      website,
      date_of_birth,
    } = updates;
    return new Promise((resolve, reject) => {
      const sql = `
          UPDATE UserProfiles
          SET 
            full_name = ?, 
            bio = ?, 
            location = ?, 
            website = ?, 
            date_of_birth = ? 
          WHERE user_id = ?`;
      db.query(
        sql,
        [
          // username,
          // email,
          full_name,
          bio,
          location,
          website,
          date_of_birth,
          userId,
        ],
        (error, results) => {
          if (error) {
            return reject(
              new Error("Error updating user profile: " + error.message)
            );
          }
          resolve(results);
        }
      );
    });
  }

  static fetchById(userId) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT * FROM UserProfiles
        WHERE user_id = ?`;
      db.query(sql, [userId], (error, results) => {
        if (error) {
          return reject(
            new Error("Error fetching user profile: " + error.message)
          );
        }
        // Check if a profile was found
        if (results.length === 0) {
          return reject(new Error("No profile found with the given ID"));
        }
        resolve(results[0]); // Return the first matching profile
      });
    });
  }
}

module.exports = UserProfile;
