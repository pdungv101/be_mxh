// controllers/userController.js
const UserService = require("../services/userService");
const UserProfileService = require("../services/userprofileService");
const { body, validationResult } = require("express-validator");

class UserController {
  static async register(req, res) {
    await body("username").isString().notEmpty().run(req);
    await body("password").isString().isLength({ min: 6 }).run(req);
    await body("email").isEmail().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, email } = req.body;
    try {
      const result = await UserService.register(username, password, email);
      const newUserId = result.insertId; // Get the new user's ID

      // Create a new profile with default null values
      await UserProfileService.createProfile(newUserId);

      res.status(201).json({ userId: newUserId });
    } catch (error) {
      res.status(500).json({ error: "Registration failed: " + error.message });
    }
  }

  static async login(req, res) {
    await body("username").isString().notEmpty().run(req);
    await body("password").isString().notEmpty().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    try {
      const { user, token } = await UserService.login(username, password);
      res.json({ user, token });
    } catch (error) {
      res.status(401).json({ error: "Login failed: " + error.message });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Fetching users failed: " + error.message });
    }
  }

  static async getUser(req, res) {
    const { id } = req.params;
    try {
      const user = await UserService.getUserById(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Fetching user failed: " + error.message });
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;
    try {
      await UserService.deleteUser(id);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Deletion failed: " + error.message });
    }
  }
}

module.exports = UserController;
