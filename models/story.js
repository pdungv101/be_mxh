const db = require("../config/db");

const createStoriesTable = `CREATE TABLE IIF NOT EXISTS Story (
    story_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    content TEXT NOT NULL,
    media_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);`;

db.query(createStoriesTable, (err, results) => {
  if (err) {
    console.error("Error creating Stories table:", err);
    return;
  }
  console.log("Stories table created successfully");
});

class Story {
  static async create(userId, content, mediaUrl) {
    const sql =
      "INSERT INTO Story (user_id, content, media_url) VALUES (?, ?, ?)";
    const [results] = await db.query(sql, [userId, content, mediaUrl]);
    return results;
  }

  static async findAll() {
    const sql = "SELECT * FROM Story ORDER BY created_at DESC";
    const [results] = await db.query(sql);
    return results;
  }

  static async findById(storyId) {
    const sql = "SELECT * FROM Story WHERE story_id = ?";
    const [results] = await db.query(sql, [storyId]);
    return results[0]; // Trả về một câu chuyện
  }

  static async update(storyId, content, mediaUrl) {
    const sql =
      "UPDATE Story SET content = ?, media_url = ? WHERE story_id = ?";
    const [results] = await db.query(sql, [content, mediaUrl, storyId]);
    return results;
  }

  static async delete(storyId) {
    const sql = "DELETE FROM Story WHERE story_id = ?";
    const [results] = await db.query(sql, [storyId]);
    return results;
  }
}

module.exports = Story;
