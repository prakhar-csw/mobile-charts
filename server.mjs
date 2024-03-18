import http from "http";
import { Redis } from "ioredis";
import { Server } from "socket.io";

// Create an HTTP server
const server = http.createServer();

// Create a Socket.IO server instance
const io = new Server(server);

let channelName = "";

// Define socket.io event handlers
io.on("connection", (socket) => {

  console.log("A user connected");

  socket.on("set_stock_channel_name", (channel) => {
    channelName = channel;
    console.log("connected to channel : ", channelName);
  });

  const redis = new Redis(6379);
  console.log('channel Nam : ',channelName);

  redis.subscribe('stock_channel', (err, count) => {
    if (err) {
      console.error("Failed to subscribe: %s", err.message);
    } else {
      console.log(
        `Subscribed successfully! This client is currently subscribed to ${count} channel ${channelName}.`
      );
    }
  });

  // Recieve MESSAGE from Redis server.
  redis.on("message", (channel, message) => {
    console.log(`Received ${message} from ${channel}`);

    // Send message to socket-client.
    socket.emit("message_from_redis", message);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
    redis.unsubscribe(channelName).then((msg)=>{
      console.log(`redis disconnected ${msg}`);
    });
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
