const BookmarkService = require("../services/bookmarkService");

class BookmarkController {
  static async createBookmark(req, res) {
    const { itemType, itemId } = req.body;
    const userId = req.user.userId; // Lấy userId từ token

    try {
      const bookmark = await BookmarkService.createBookmark(
        userId,
        itemType,
        itemId
      );
      res.status(201).json({ bookmarkId: bookmark.insertId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllBookmarks(req, res) {
    const userId = req.user.userId; // Lấy userId từ token
    try {
      const bookmarks = await BookmarkService.getAllBookmarksByUserId(userId);
      res.json(bookmarks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getBookmark(req, res) {
    const { bookmarkId } = req.params;
    try {
      const bookmark = await BookmarkService.getBookmarkById(bookmarkId);
      if (!bookmark) {
        return res.status(404).json({ message: "Bookmark not found" });
      }
      res.json(bookmark);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateBookmark(req, res) {
    const { bookmarkId } = req.params;
    const { itemType, itemId } = req.body;

    try {
      const result = await BookmarkService.updateBookmark(
        bookmarkId,
        itemType,
        itemId
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Bookmark not found" });
      }
      res.json({ message: "Bookmark updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteBookmark(req, res) {
    const { bookmarkId } = req.params;
    try {
      const result = await BookmarkService.deleteBookmark(bookmarkId);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Bookmark not found" });
      }
      res.json({ message: "Bookmark deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = BookmarkController;
