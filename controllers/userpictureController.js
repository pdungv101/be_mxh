// controllers/userPictureController.js
const UserPictureService = require("../services/userpictureService");

class UserPictureController {
  static async uploadProfilePicture(req, res) {
    const { id } = req.params;
    console.log("🚀 ~ UserPictureController ~ uploadProfilePicture ~ id:", id);
    const file = req.file; // Multer will attach the file to req.file

    if (!file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const picturePath = `uploads/${file.filename}`; // Construct the path to the uploaded file

    try {
      await UserPictureService.uploadProfilePicture(id, picturePath);
      res.json({
        message: "Profile picture uploaded successfully",
        picturePath,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to upload profile picture: " + error.message });
    }
  }

  static async removeProfilePicture(req, res) {
    const { id } = req.params;
    try {
      await UserPictureService.removeProfilePicture(id);
      res.json({ message: "Profile picture removed successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to remove profile picture: " + error.message });
    }
  }
}

module.exports = UserPictureController;
