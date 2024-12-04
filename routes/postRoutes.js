const express = require("express");
const PostController = require("../controllers/postController");
const upload = require("../config/multer");
const authenticateJWT = require("../middlewares/authMiddleware");
const router = express.Router();

// Route to create a new post with media uploads
router.post(
  "/",
  authenticateJWT,
  upload.array("media"), // Middleware for handling media uploads
  PostController.createPost
);

// Route to get a specific post by ID
router.get("/:id", PostController.getPost);

// Route to get all posts
router.get("/", PostController.getAllPosts);

// Route to get all posts by a specific user ID
router.get("/user/:userId", PostController.getPostsByUserId); // New route for fetching posts by user ID

// Route to update a specific post by ID
router.put("/:id", authenticateJWT, PostController.updatePost);

// Route to delete a specific post by ID
router.delete("/:id", authenticateJWT, PostController.deletePost);

// Route to delete media by media ID
router.delete("/media/:mediaId", authenticateJWT, PostController.deleteMedia);

module.exports = router;
