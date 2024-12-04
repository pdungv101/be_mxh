const express = require("express");
const FavoriteController = require("../controllers/favoriteController");
const authenticateJWT = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authenticateJWT, FavoriteController.createFavorite);
router.get("/", authenticateJWT, FavoriteController.getAllFavorites);
router.get("/:favoriteId", authenticateJWT, FavoriteController.getFavorite);
router.put("/:favoriteId", authenticateJWT, FavoriteController.updateFavorite);
router.delete(
  "/:favoriteId",
  authenticateJWT,
  FavoriteController.deleteFavorite
);

module.exports = router;
