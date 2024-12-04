const express = require("express");
const NotificationController = require("../controllers/notificationController");
const authenticateJWT = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authenticateJWT, NotificationController.createNotification);
router.get("/", authenticateJWT, NotificationController.getNotifications);
router.put(
  "/:notificationId/read",
  authenticateJWT,
  NotificationController.markAsRead
);

module.exports = router;
