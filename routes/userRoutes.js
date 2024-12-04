// routes/userRoutes.js
const express = require("express");
const UserController = require("../controllers/userController");
const authenticateJWT = require("../middlewares/authMiddleware");
const router = express.Router();

// User registration
router.post("/register", UserController.register);

// User login
router.post("/login", UserController.login);

// Get all users
router.get("/", authenticateJWT, UserController.getAllUsers);

// Get a specific user by ID
router.get("/:id", authenticateJWT, UserController.getUser);

// Delete user
router.delete("/:id", authenticateJWT, UserController.deleteUser);

module.exports = router;
