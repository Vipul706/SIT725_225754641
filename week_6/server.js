const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// --- Poll State ---
const poll = {
  question: "What is your favourite programming language?",
  options: ["JavaScript", "Python", "Java", "C++"],
  votes: { JavaScript: 0, Python: 0, Java: 0, "C++": 0 },
  voters: new Set(), // track socket IDs to prevent double voting
};

// Track connected users count
let connectedUsers = 0;

// --- Socket.IO Events ---
io.on("connection", (socket) => {
  connectedUsers++;
  console.log(`User connected: ${socket.id} | Total: ${connectedUsers}`);

  // Send current poll state to the newly connected client
  socket.emit("poll:state", {
    question: poll.question,
    options: poll.options,
    votes: poll.votes,
    hasVoted: poll.voters.has(socket.id),
  });

  // Broadcast updated user count to everyone
  io.emit("users:count", connectedUsers);

  // Handle a vote submission
  socket.on("poll:vote", (option) => {
    // Ignore if already voted or option is invalid
    if (poll.voters.has(socket.id)) {
      socket.emit("poll:error", "You have already voted!");
      return;
    }
    if (!poll.options.includes(option)) {
      socket.emit("poll:error", "Invalid option.");
      return;
    }

    // Record vote
    poll.votes[option]++;
    poll.voters.add(socket.id);

    console.log(`Vote received for "${option}" from ${socket.id}`);

    // Broadcast updated votes to ALL clients
    io.emit("poll:update", poll.votes);

    // Acknowledge to the voter they succeeded
    socket.emit("poll:voted", option);
  });

  // Handle a poll reset (admin action - any client can trigger for demo purposes)
  socket.on("poll:reset", () => {
    poll.options.forEach((opt) => (poll.votes[opt] = 0));
    poll.voters.clear();
    console.log("Poll has been reset.");
    io.emit("poll:reset", poll.votes);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    connectedUsers--;
    console.log(`User disconnected: ${socket.id} | Total: ${connectedUsers}`);
    io.emit("users:count", connectedUsers);
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Live Poll server running at http://localhost:${PORT}`);
});
