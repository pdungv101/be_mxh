const db = require("../config/db");

const createReelsTable = `CREATE TABLE IF NOT EXISTS Reel (
    reel_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    media_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);`;

db.query(createReelsTable, (err, results) => {
  if (err) {
    console.error("Error creating Reel table:", err);
    return;
  }
  console.log("Reel table created successfully");
});

class Reel {
  static async create(userId, title, description, mediaUrl) {
    const sql =
      "INSERT INTO Reel (user_id, title, description, media_url) VALUES (?, ?, ?, ?)";
    const [results] = await db.query(sql, [
      userId,
      title,
      description,
      mediaUrl,
    ]);
    return results;
  }

  static async findAll() {
    const sql = "SELECT * FROM Reel ORDER BY created_at DESC";
    const [results] = await db.query(sql);
    return results;
  }

  static async findById(reelId) {
    const sql = "SELECT * FROM Reel WHERE reel_id = ?";
    const [results] = await db.query(sql, [reelId]);
    return results[0]; // Trả về một reel
  }

  static async update(reelId, title, description, mediaUrl) {
    const sql =
      "UPDATE Reel SET title = ?, description = ?, media_url = ? WHERE reel_id = ?";
    const [results] = await db.query(sql, [
      title,
      description,
      mediaUrl,
      reelId,
    ]);
    return results;
  }

  static async delete(reelId) {
    const sql = "DELETE FROM Reel WHERE reel_id = ?";
    const [results] = await db.query(sql, [reelId]);
    return results;
  }
}

module.exports = Reel;
