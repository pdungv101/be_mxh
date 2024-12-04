const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io"); // Change to use destructured import for clarity
const userRoutes = require("./routes/userRoutes");
const userProfileRoutes = require("./routes/userprofileRoutes");
const userPictureRoutes = require("./routes/userpictureRoutes");
const userCoverRoutes = require("./routes/usercoverRoutes");

const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const postlikeRoutes = require("./routes/postlikeRoutes");
const commentlikeRoutes = require("./routes/commentlikeRoutes");
const followRoutes = require("./routes/followRoutes");
const messageRoutes = require("./routes/messageRoutes");

const MessageService = require("./services/messageService");
const UserService = require("./services/userService");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001", // Adjust this to match your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Enable cookies if needed
  },
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/userprofiles", userProfileRoutes);
app.use("/api/userpictures", userPictureRoutes);
app.use("/api/usercovers", userCoverRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/postlikes", postlikeRoutes);
app.use("/api/commentlikes", commentlikeRoutes);
app.use("/api/follows", followRoutes);
app.use("/api/messages", messageRoutes);

app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

// In-memory mapping of user IDs to socket IDs
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Register the user when they connect
  socket.on("register_user", (userId) => {
    userSocketMap[userId] = socket.id;
    console.log(`User registered: ${userId} with socket ID: ${socket.id}`);
  });

  socket.on("send_message", async (data) => {
    // Log the received message data
    const { sender_id, receiver_id, content } = data;
    // console.log("Received message data:", { sender_id, receiver_id, content });

    // Validate parameters
    if (!sender_id || !receiver_id || !content) {
      console.error("Sender ID, Receiver ID, and content must be provided.");
      return socket.emit("error", {
        message: "Sender ID, Receiver ID, and content are required.",
      });
    }

    try {
      const result = await MessageService.createMessage(
        sender_id,
        receiver_id,
        content
      );
      const receiverSocketId = userSocketMap[receiver_id];

      const senderUser = await UserService.getUserById(sender_id); // Ensure you have this service
      const createdAt = new Date().toISOString(); // Use ISO string for consistent date format

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receive_message", {
          messageId: result.insertId,
          sender_id,
          receiver_id,
          content,
          sender_username: senderUser.username,
          created_at: createdAt,
        });
      } else {
        console.error(`Receiver ${receiver_id} is not connected.`);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      socket.emit("error", { message: "Failed to send message." });
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);

    // Remove socket ID from mapping when a user disconnects
    for (const userId in userSocketMap) {
      if (userSocketMap[userId] === socket.id) {
        delete userSocketMap[userId];
        console.log(`User unregistered: ${userId}`);
        break;
      }
    }
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
