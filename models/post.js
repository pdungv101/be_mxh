const db = require("../config/db");

// Tạo bảng Posts
const createPostsTable = `CREATE TABLE IF NOT EXISTS Posts (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);`;

db.query(createPostsTable, (err) => {
  if (err) {
    console.error("Error creating Posts table:", err);
    return;
  }
  console.log("Posts table created successfully");
});

// Tạo bảng PostMedia
const createPostMediaTable = `CREATE TABLE IF NOT EXISTS PostMedia (
    media_id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT,
    media_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (post_id) REFERENCES Posts(post_id) ON DELETE CASCADE
);`;

db.query(createPostMediaTable, (err) => {
  if (err) {
    console.error("Error creating PostMedia table:", err);
    return;
  }
  console.log("PostMedia table created successfully");
});

class Post {
  static query(sql, params) {
    return new Promise((resolve, reject) => {
      db.query(sql, params, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  static async create(userId, content) {
    const sql = "INSERT INTO Posts (user_id, content) VALUES (?, ?)";
    try {
      const result = await this.query(sql, [userId, content]);
      // Return the ID of the newly created post
      return result.insertId; // Assuming you're using MySQL or similar
    } catch (error) {
      console.error("Error creating post:", error);
      throw error; // Rethrow the error for handling in the controller
    }
  }

  // Method to add media to a specific post
  static async addMedia(postId, mediaUrl) {
    const sql = "INSERT INTO PostMedia (post_id, media_url) VALUES (?, ?)";
    try {
      await this.query(sql, [postId, mediaUrl]);
    } catch (error) {
      console.error("Error adding media:", error);
      throw error; // Rethrow the error for handling in the controller
    }
  }

  static async findAll() {
    const sql = `
      SELECT 
          p.post_id,
          p.user_id,
          p.content,
          p.created_at,
          u.username,
          pm.media_url
      FROM 
          Posts p
      JOIN 
          Users u ON p.user_id = u.user_id
      LEFT JOIN 
          PostMedia pm ON p.post_id = pm.post_id
      ORDER BY 
          p.created_at DESC;
    `;

    const results = await this.query(sql);

    const formattedPosts = results.reduce((acc, post) => {
      const existingPost = acc.find((item) => item.post_id === post.post_id);

      const mediaUrl = post.media_url ? post.media_url.replace(/\\/g, "/") : "";

      if (existingPost) {
        if (mediaUrl) {
          existingPost.media.push(mediaUrl);
        }
      } else {
        acc.push({
          post_id: post.post_id,
          user_id: post.user_id,
          content: post.content,
          created_at: new Date(post.created_at).toISOString(), // Format date
          username: post.username,
          media: mediaUrl ? [mediaUrl] : [], // Initialize media array
        });
      }
      return acc;
    }, []);

    return formattedPosts; // Return formatted list of posts
  }

  static async findById(postId) {
    const sql = `
      SELECT 
          p.post_id,
          p.user_id,
          p.content,
          p.created_at,
          u.username,
          pm.media_url
      FROM 
          Posts p
      JOIN 
          Users u ON p.user_id = u.user_id
      LEFT JOIN 
          PostMedia pm ON p.post_id = pm.post_id
      WHERE 
          p.post_id = ?
    `;

    const results = await this.query(sql, [postId]);

    // Check if any post was found
    if (results.length === 0) {
      throw new Error(`Post with ID ${postId} not found`); // Handle not found case
    }

    // Format the fetched post data
    const formattedPost = results.reduce((acc, post) => {
      const mediaUrl = post.media_url ? post.media_url.replace(/\\/g, "/") : "";

      if (acc.post_id === post.post_id) {
        // If post already exists in accumulator, add media_url to media array
        if (mediaUrl) {
          acc.media.push(mediaUrl);
        }
      } else {
        // If not exists, initialize the post object
        acc = {
          post_id: post.post_id,
          user_id: post.user_id,
          content: post.content,
          created_at: new Date(post.created_at).toISOString(), // Format date
          username: post.username,
          media: mediaUrl ? [mediaUrl] : [], // Initialize media array
        };
      }
      return acc;
    }, {});

    return formattedPost; // Return the formatted post
  }

  static async findByUserId(userId) {
    const sql = `
      SELECT 
          p.post_id,
          p.user_id,
          p.content,
          p.created_at,
          u.username,
          pm.media_url
      FROM 
          Posts p
      JOIN 
          Users u ON p.user_id = u.user_id
      LEFT JOIN 
          PostMedia pm ON p.post_id = pm.post_id
      WHERE 
          p.user_id = ?
      ORDER BY 
          p.created_at DESC;`;

    const results = await this.query(sql, [userId]);

    const formattedPosts = results.reduce((acc, post) => {
      const existingPost = acc.find((item) => item.post_id === post.post_id);
      const mediaUrl = post.media_url ? post.media_url.replace(/\\/g, "/") : "";

      if (existingPost) {
        if (mediaUrl) {
          existingPost.media.push(mediaUrl); // Add media URL to existing post
        }
      } else {
        acc.push({
          post_id: post.post_id,
          user_id: post.user_id,
          content: post.content,
          created_at: new Date(post.created_at).toISOString(), // Format date
          username: post.username,
          media: mediaUrl ? [mediaUrl] : [], // Initialize media array
        });
      }
      return acc;
    }, []);

    return formattedPosts; // Return formatted list of posts
  }

  static async update(postId, userId, content) {
    const sql =
      "UPDATE Posts SET content = ? WHERE post_id = ? AND user_id = ?";
    const result = await this.query(sql, [content, postId, userId]);
    return result.affectedRows > 0; // Trả về true nếu đã cập nhật
  }

  static async delete(postId, userId) {
    const sql = "DELETE FROM Posts WHERE post_id = ? AND user_id = ?";
    const result = await this.query(sql, [postId, userId]);
    return result.affectedRows > 0; // Trả về true nếu đã xóa
  }

  static async deleteMedia(mediaId) {
    const sql = "DELETE FROM PostMedia WHERE media_id = ?";
    await this.query(sql, [mediaId]);
  }
}

module.exports = Post;
