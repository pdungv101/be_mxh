const express = require("express");
const ReelController = require("../controllers/reelController");
const upload = require("../config/multer"); // Nếu bạn sử dụng multer để tải lên media
const authenticateJWT = require("../middlewares/authMiddleware");
const router = express.Router();

router.post(
  "/",
  authenticateJWT,
  upload.single("media"),
  ReelController.createReel
);
router.get("/", ReelController.getAllReels);
router.get("/:reelId", ReelController.getReel);
router.put(
  "/:reelId",
  authenticateJWT,
  upload.single("media"),
  ReelController.updateReel
);
router.delete("/:reelId", authenticateJWT, ReelController.deleteReel);

module.exports = router;
