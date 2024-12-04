// routes/followRoutes.js
const express = require("express");
const FollowController = require("../controllers/followController");
const authenticateJWT = require("../middlewares/authMiddleware");
const router = express.Router();

// Route to follow a user
router.post("/", authenticateJWT, FollowController.followUser);

// Route to unfollow a user
router.delete("/", authenticateJWT, FollowController.unfollowUser);

// Route to get the follower count of a user
router.get("/:userId/followers", FollowController.getFollowerCount);

// Route to check if a user is followed
router.get(
  "/:followedId/isFollowed",
  authenticateJWT,
  FollowController.isUserFollowed
);

// Route to get the followed users of a user
router.get("/:userId/followed", FollowController.getFollowedUsers);

module.exports = router;
