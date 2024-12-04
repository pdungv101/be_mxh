// routes/userProfileRoutes.js
const express = require("express");
const UserProfileController = require("../controllers/userprofileController");
const authenticateJWT = require("../middlewares/authMiddleware");
const router = express.Router();

// Update user details
router.put("/:id", authenticateJWT, UserProfileController.updateUser);

// // Get user profile
router.get(
  "/:id",
  // authenticateJWT,
  UserProfileController.getUserProfile
);

module.exports = router;
