const db = require("../config/db");

const createBookmarksTable = `CREATE TABLE IF NOT EXISTS Bookmark (
    bookmark_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    item_type ENUM('post', 'story', 'reel') NOT NULL,
    item_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);`;

db.query(createBookmarksTable, (err, results) => {
  if (err) {
    console.error("Error creating Bookmark table:", err);
    return;
  }
  console.log("Bookmark table created successfully");
});

class Bookmark {
  static async create(userId, itemType, itemId) {
    const sql =
      "INSERT INTO Bookmark (user_id, item_type, item_id) VALUES (?, ?, ?)";
    const [results] = await db.query(sql, [userId, itemType, itemId]);
    return results;
  }

  static async findAllByUserId(userId) {
    const sql = "SELECT * FROM Bookmark WHERE user_id = ?";
    const [results] = await db.query(sql, [userId]);
    return results;
  }

  static async findById(bookmarkId) {
    const sql = "SELECT * FROM Bookmark WHERE bookmark_id = ?";
    const [results] = await db.query(sql, [bookmarkId]);
    return results[0]; // Trả về một bookmark
  }

  static async update(bookmarkId, itemType, itemId) {
    const sql =
      "UPDATE Bookmark SET item_type = ?, item_id = ? WHERE bookmark_id = ?";
    const [results] = await db.query(sql, [itemType, itemId, bookmarkId]);
    return results;
  }

  static async delete(bookmarkId) {
    const sql = "DELETE FROM Bookmark WHERE bookmark_id = ?";
    const [results] = await db.query(sql, [bookmarkId]);
    return results;
  }
}

module.exports = Bookmark;
