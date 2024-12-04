// routes/postLikeRoutes.js
const express = require("express");
const PostLikeController = require("../controllers/postlikeController");
const authenticateJWT = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authenticateJWT, PostLikeController.likePost);
router.delete("/", authenticateJWT, PostLikeController.unlikePost);
router.get("/:postId", PostLikeController.getLikeCount);
router.get("/:postId/isLiked", authenticateJWT, PostLikeController.isPostLiked);
module.exports = router;
