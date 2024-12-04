// services/userService.js
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class UserService {
  static async register(username, password, email) {
    try {
      const result = await User.create(username, password, email);
      return result;
    } catch (error) {
      throw new Error("Registration failed: " + error.message);
    }
  }

  static async login(username, password) {
    const user = await User.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { userId: user.user_id },
        process.env.JWT_SECRET || "your_jwt_secret",
        { expiresIn: "3d" }
      );
      return { user, token };
    }
    throw new Error("Invalid login credentials");
  }

  static async getAllUsers() {
    return User.findAll();
  }

  static async getUserById(userId) {
    return User.findById(userId);
  }

  static async deleteUser(userId) {
    try {
      return await User.delete(userId);
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }
}

module.exports = UserService;
