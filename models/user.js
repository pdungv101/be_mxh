const db = require("../config/db");
const bcrypt = require("bcrypt");

const createUsersTable = `CREATE TABLE IF NOT EXISTS Users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  profile_picture VARCHAR(255),
  cover_picture VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  is_online BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`;
db.query(createUsersTable, (err) => {
  if (err) {
    console.error("Error creating Users table:", err);
    return;
  }
  console.log("Users table created successfully");
});

class User {
  static async create(username, password, email) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const sql =
      "INSERT INTO Users (username, password, email) VALUES (?, ?, ?)";

    return new Promise((resolve, reject) => {
      db.query(sql, [username, hashedPassword, email], (error, results) => {
        if (error) {
          return reject(new Error("Error creating user: " + error.message));
        }
        resolve(results);
      });
    });
  }

  static findByUsername(username) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM Users WHERE username = ?";
      db.query(sql, [username], (error, results) => {
        if (error) {
          return reject(
            new Error("Error finding user by username: " + error.message)
          );
        }
        resolve(results[0]);
      });
    });
  }

  static findById(userId) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM Users WHERE user_id = ?";
      db.query(sql, [userId], (error, results) => {
        if (error) {
          return reject(
            new Error("Error finding user by ID: " + error.message)
          );
        }
        resolve(results[0]);
      });
    });
  }

  static delete(userId) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM Users WHERE user_id = ?";
      db.query(sql, [userId], (error, results) => {
        if (error) {
          return reject(new Error("Error deleting user: " + error.message));
        }
        resolve(results);
      });
    });
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM Users";
      db.query(sql, (error, results) => {
        if (error) {
          return reject(new Error("Error fetching users: " + error.message));
        }
        resolve(results);
      });
    });
  }
}

module.exports = User;
