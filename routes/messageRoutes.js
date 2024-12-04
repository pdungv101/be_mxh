const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/messageController"); // Adjust the import path
// HTTP routes
router.post("/", MessageController.sendMessage);
router.get("/receiver/:receiverId", MessageController.fetchMessages);
router.put("/:messageId", MessageController.updateMessage);
router.delete("/:messageId", MessageController.deleteMessage);
router.get("/:messageId", MessageController.fetchMessageById);
router.get("/messages/:senderId/:receiverId", MessageController.getMessages);
// Trong routes/messageRoutes.js
router.get(
  "/latest/:senderId/:receiverId",
  MessageController.fetchNewestMessage
);
module.exports = router;
