// import { createServer } from "http";
// import { Redis } from "ioredis";
// import { createClient } from "redis";
// import { Server } from "socket.io";

// const server = createServer();
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["*"],
//   },
// });

// let channelName = "";
// let symbol = "";
// let intervalTimer = null;

// function generateRandomPrice(min, max) {
//   const random = Math.random();
//   const scaledRandom = random * (max - min) + min;
//   const roundedPrice = Number(scaledRandom.toFixed(2));
//   return roundedPrice;
// }

// // Define socket.io event handlers
// io.on("connection", (socket) => {
//   console.log("A user connected");

//   const redis = new Redis({
//     host: "localhost",
//     port: 6379,
//   });

//   const redisClient = createClient();

//   const makeRedisSubscribeToChannel = (channelName) => {
//     redisClient.subscribe(channelName, (err, count) => {
//       if (err) {
//         console.error("Failed to subscribe: %s", err.message);
//       } else {
//         console.log(
//           `Subscribed successfully! This client is currently subscribed to ${count} channel ${channelName}.`
//         );
//       }
//     });
//   }

//   socket.on("set_stock_channel_name", (stockObj) => {
//     console.log("stock object : ", stockObj);

//     channelName = stockObj.stock_channel;
//     symbol = stockObj.stock_symbol;

//     makeRedisSubscribeToChannel(channelName);

//     if (!intervalTimer) {
//       console.log("iterval starts");
//       intervalTimer = setInterval(() => {
//         let ltp_price = generateRandomPrice(180, 182).toString();
//         let close_price = generateRandomPrice(180, 182).toString(); // Generate random price between given time range

//         const time = new Date().getTime(); // Get the current time in millisecond

//         const data = {
//           symbol: symbol,
//           ltp: ltp_price,
//           chngPer: "-2.34",
//           chng: "-22.65",
//           close: close_price,
//           timestamp: time,
//           ltt: time,
//         };

//         redis.publish(channelName, JSON.stringify(data));
//       }, 5000);
//     }
//   });

//   console.log("Setting up redis connection.");

//   console.log("looking for channel now...", channelName);

//   // if (channelName) {
//     // Subscribe to the channel
//     console.log("subscribed to channel : ", channelName);
    

//     // Recieve MESSAGE from Redis server.
//     redisClient.on("message", (channel, message) => {
//       console.log(`Received ${message} from ${channel}`);

//       // Send message to socket-client.
//       socket.emit("message_from_redis", message);
//     });

//     // Handle disconnection
//     socket.on("disconnect", () => {
//       console.log("User disconnected");

//       redisClient.unsubscribe(channelName).then((msg) => {
//         console.log(`redis disconnected ${msg}`);
//         redisClient.quit();
//         redis.quit();
//       });
      

//       if (intervalTimer) clearInterval(intervalTimer);
//     });
//   // }
// });

// // Start the server
// const PORT = 4000;
// server.listen(PORT, () => {
//   console.log(`Socket.IO server running on port ${PORT}`);
// });

import { createServer } from "http";
import { Redis } from "ioredis";
import { Server } from "socket.io";

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["*"],
  },
});

let channelName = "";
let symbol = "";
let intervalTimer = null;

function generateRandomPrice(min, max) {
  const random = Math.random();
  const scaledRandom = random * (max - min) + min;
  const roundedPrice = Number(scaledRandom.toFixed(2));
  return roundedPrice;
}

// Define socket.io event handlers
io.on("connection", (socket) => {
  console.log("A user connected");

  let redisSubscriber = new Redis({
    host: "localhost",
    port: 6379,
  });

  let redisPublisher = new Redis({
    host: "localhost",
    port: 6379,
  });

  socket.on("set_stock_channel_name", (stockObj) => {
    console.log("stock object : ", stockObj);

    channelName = stockObj.stock_channel;
    symbol = stockObj.stock_symbol;

    // Stop the interval if it's already running
    clearInterval(intervalTimer);

    console.log("interval starts");
    intervalTimer = setInterval(() => {
      let ltp_price = generateRandomPrice(180, 182).toString();
      let close_price = generateRandomPrice(180, 182).toString(); // Generate random price between given time range

      const time = new Date().getTime(); // Get the current time in millisecond

      const data = {
        symbol: symbol,
        ltp: ltp_price,
        chngPer: "-2.34",
        chng: "-22.65",
        close: close_price,
        timestamp: time,
        ltt: time,
      };

      redisPublisher.publish(channelName, JSON.stringify(data));
    }, 5000);

    // Subscribe to the channel
    redisSubscriber.subscribe(channelName, (err, count) => {
      if (err) {
        console.error("Failed to subscribe: %s", err.message);
      } else {
        console.log(
          `Subscribed successfully! This client is currently subscribed to ${count} channel ${channelName}.`
        );
      }
    });
  });

  // Recieve MESSAGE from Redis server.
  redisSubscriber.on("message", (channel, message) => {
    console.log(`Received ${message} from ${channel}`);

    // Send message to socket-client.
    socket.emit("message_from_redis", message);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");

    clearInterval(intervalTimer);

    if (channelName) {
      redisSubscriber.unsubscribe(channelName).then((msg) => {
        console.log(`redis disconnected ${msg}`);
        redisSubscriber.quit();
      });
    }
  });
});

// Start the server
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
