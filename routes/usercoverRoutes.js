// routes/userCoverRoutes.js
const express = require("express");
const UserCoverController = require("../controllers/usercoverController");
const authenticateJWT = require("../middlewares/authMiddleware");
const upload = require("../config/multer"); // Import multer configuration
const router = express.Router();

// Upload cover picture
router.put(
  "/:id/upload-cover-picture",
  authenticateJWT,
  upload.single("cover_picture"),
  UserCoverController.uploadCoverPicture
);

// Remove cover picture
router.delete(
  "/:id/remove-cover-picture",
  authenticateJWT,
  UserCoverController.removeCoverPicture
);

module.exports = router;
