// routes/userPictureRoutes.js
const express = require("express");
const UserPictureController = require("../controllers/userpictureController");
const authenticateJWT = require("../middlewares/authMiddleware");
const upload = require("../config/multer"); // Import multer configuration
const router = express.Router();

// Upload profile picture
router.put(
  "/:id/upload-profile-picture",
  authenticateJWT,
  upload.single("profile_picture"),
  UserPictureController.uploadProfilePicture
);

// Remove profile picture
router.delete(
  "/:id/remove-profile-picture",
  authenticateJWT,
  UserPictureController.removeProfilePicture
);

module.exports = router;
