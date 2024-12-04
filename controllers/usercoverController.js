// controllers/userCoverController.js
const UserCoverService = require("../services/usercoverService");

class UserCoverController {
  static async uploadCoverPicture(req, res) {
    const { id } = req.params;
    const file = req.file; // Multer will attach the file to req.file

    if (!file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const coverPath = `uploads/${file.filename}`; // Construct the path to the uploaded file

    try {
      await UserCoverService.uploadCoverPicture(id, coverPath);
      res.json({
        message: "Cover picture uploaded successfully",
        coverPath,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to upload cover picture: " + error.message });
    }
  }

  static async removeCoverPicture(req, res) {
    const { id } = req.params;
    try {
      await UserCoverService.removeCoverPicture(id);
      res.json({ message: "Cover picture removed successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to remove cover picture: " + error.message });
    }
  }
}

module.exports = UserCoverController;
