const Favorite = require("../models/favorite");

class FavoriteService {
  static async createFavorite(userId, itemType, itemId) {
    return Favorite.create(userId, itemType, itemId);
  }

  static async getAllFavoritesByUserId(userId) {
    return Favorite.findAllByUserId(userId);
  }

  static async getFavoriteById(favoriteId) {
    return Favorite.findById(favoriteId);
  }

  static async updateFavorite(favoriteId, itemType, itemId) {
    return Favorite.update(favoriteId, itemType, itemId);
  }

  static async deleteFavorite(favoriteId) {
    return Favorite.delete(favoriteId);
  }
}

module.exports = FavoriteService;
