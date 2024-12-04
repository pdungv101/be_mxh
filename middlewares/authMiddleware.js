// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.error("Token verification error:", err); // Log the error
        return res.sendStatus(403);
      }
      req.user = user; // Store user info in req
      // console.log("Authenticated user:", req.user); // Log authenticated user
      next();
    });
  } else {
    console.error("No token provided."); // Log missing token
    res.sendStatus(401);
  }
};

module.exports = authenticateJWT;
