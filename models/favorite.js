const db = require("../config/db");
Stories;
const createFavoritesTable = `CREATE TABLE IF NOT EXISTS Favorite (
    favorite_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    item_type ENUM('post', 'story', 'reel') NOT NULL,
    item_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);`;

db.query(createFavoritesTable, (err, results) => {
  if (err) {
    console.error("Error creating Favorite table:", err);
    return;
  }
  console.log("Favorite table created successfully");
});

class Favorite {
  static async create(userId, itemType, itemId) {
    const sql =
      "INSERT INTO Favorite (user_id, item_type, item_id) VALUES (?, ?, ?)";
    const [results] = await db.query(sql, [userId, itemType, itemId]);
    return results;
  }

  static async findAllByUserId(userId) {
    const sql = "SELECT * FROM Favorite WHERE user_id = ?";
    const [results] = await db.query(sql, [userId]);
    return results;
  }

  static async findById(favoriteId) {
    const sql = "SELECT * FROM Favorite WHERE favorite_id = ?";
    const [results] = await db.query(sql, [favoriteId]);
    return results[0]; // Trả về một favorite
  }

  static async update(favoriteId, itemType, itemId) {
    const sql =
      "UPDATE Favorite SET item_type = ?, item_id = ? WHERE favorite_id = ?";
    const [results] = await db.query(sql, [itemType, itemId, favoriteId]);
    return results;
  }

  static async delete(favoriteId) {
    const sql = "DELETE FROM Favorite WHERE favorite_id = ?";
    const [results] = await db.query(sql, [favoriteId]);
    return results;
  }
}

module.exports = Favorite;
