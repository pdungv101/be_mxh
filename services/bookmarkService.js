const Bookmark = require("../models/bookmark");

class BookmarkService {
  static async createBookmark(userId, itemType, itemId) {
    return Bookmark.create(userId, itemType, itemId);
  }

  static async getAllBookmarksByUserId(userId) {
    return Bookmark.findAllByUserId(userId);
  }

  static async getBookmarkById(bookmarkId) {
    return Bookmark.findById(bookmarkId);
  }

  static async updateBookmark(bookmarkId, itemType, itemId) {
    return Bookmark.update(bookmarkId, itemType, itemId);
  }

  static async deleteBookmark(bookmarkId) {
    return Bookmark.delete(bookmarkId);
  }
}

module.exports = BookmarkService;
