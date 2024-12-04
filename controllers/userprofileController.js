// controllers/userProfileController.js
const UserProfileService = require("../services/userprofileService");
const { body, validationResult } = require("express-validator");

class UserProfileController {
  static async updateUser(req, res) {
    const { id } = req.params;
    const {
      // username,
      // email,
      full_name,
      bio,
      location,
      website,
      date_of_birth,
    } = req.body;

    // Validation for optional fields
    // await body("username").optional().isString().notEmpty().run(req);
    // await body("email").optional().isEmail().run(req);
    await body("full_name").optional().isString().run(req);
    await body("bio").optional().isString().run(req);
    await body("location").optional().isString().run(req);
    await body("website").optional().isURL().run(req);
    await body("date_of_birth").optional().isDate().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updates = {
        // username,
        // email,
        full_name,
        bio,
        location,
        website,
        date_of_birth,
      };
      await UserProfileService.updateUser(id, updates);
      res.json({ message: "User updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Update failed: " + error.message });
    }
  }

  static async getUserProfile(req, res) {
    const { id } = req.params;
    try {
      const userProfile = await UserProfileService.fetchProfile(id);
      if (userProfile) {
        res.json(userProfile);
      } else {
        res.status(404).json({ error: "User profile not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Fetching user profile failed: " + error.message });
    }
  }
}

module.exports = UserProfileController;
