import http from "http";
import { Redis } from "ioredis";
import { Server } from "socket.io";

// Create an HTTP server
const server = http.createServer();

// Create a Socket.IO server instance
const io = new Server(server);

// Define socket.io event handlers
io.on("connection", (socket) => {
  console.log("A user connected");

  const redis = new Redis(6379);

  redis.subscribe("stock_channel", (err, count) => {
    if (err) {
      console.error("Failed to subscribe: %s", err.message);
    } else {
      console.log(
        `Subscribed successfully! This client is currently subscribed to ${count} channel.`
      );
    }
  });

  // Recieve MESSAGE from Redis server.
  redis.on("message", (channel, message) => {
    console.log(`Received ${message} from ${channel}`);
    socket.emit('message_from_redis', message);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on('message', message=>console.log('message : ',message));
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
