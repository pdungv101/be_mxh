const express = require("express");
const StoryController = require("../controllers/storyController");
const upload = require("../config/multer"); // Nếu bạn sử dụng multer để tải lên media
const authenticateJWT = require("../middlewares/authMiddleware");
const router = express.Router();

router.post(
  "/",
  authenticateJWT,
  upload.single("media"),
  StoryController.createStory
);
router.get("/", StoryController.getAllStories);
router.get("/:storyId", StoryController.getStory);
router.put(
  "/:storyId",
  authenticateJWT,
  upload.single("media"),
  StoryController.updateStory
);
router.delete("/:storyId", authenticateJWT, StoryController.deleteStory);

module.exports = router;
