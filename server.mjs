import http from "http";
import { Redis } from "ioredis";
import { Server } from "socket.io";

const server = http.createServer();
const io = new Server(server);

let channelName = "";
let intervalTimer = null;

// Define socket.io event handlers
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("set_stock_channel_name", (channel) => {
    channelName = channel;
    console.log("connected to channel : ", channelName);

    function generateRandomPrice(min, max) {
      const random = Math.random();
      const scaledRandom = random * (max - min) + min;
      const roundedPrice = Number(scaledRandom.toFixed(2));
      return roundedPrice;
    }
    
    if(!intervalTimer) {
      console.log('iterval starts');
      intervalTimer = setInterval(() => {
        let ltp_price = generateRandomPrice(960, 970).toString();
        let close_price = generateRandomPrice(960, 970).toString();  // Generate random price between given time range

        const time = new Date().getTime(); // Get the current time in millisecond

        const data = {
          symbol: "3456_NSE",
          ltp: ltp_price,
          chngPer: "-2.34",
          chng: "-22.65",
          close: close_price,
          timestamp: time,
          ltt: time,
        };

        redis.publish(channelName, JSON.stringify(data));
      }, 1000);
    }
  });

  const redis = new Redis({
    host: "localhost",
    port: 6379,
  });

  if (channelName) {
    redis.subscribe(channelName, (err, count) => {
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

      redis.unsubscribe(channelName).then((msg) => {
        console.log(`redis disconnected ${msg}`);
      });

      redis.quit();

      if (intervalTimer) clearInterval(intervalTimer);
    });
  }
});

// Start the server
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
