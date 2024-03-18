import { io } from "socket.io-client";

import { getChannelString } from "../utilityFunctions";

// Returns all parts of the symbol
export function parseFullSymbol(fullSymbol) {
  const match = fullSymbol.match(/^(\w+):(\w+)\/(\w+)$/);
  if (!match) {
    return null;
  }
  return { exchange: match[1], fromSymbol: match[2], toSymbol: match[3] };
}

/* Sample object
  { 
    symbol: '3456_NSE',
    ltp: '945.10',
    chngPer: '-2.34',
    chng: '-22.65',
    close: '967.75',
    timestamp: 1710512476,
    ltt: 1710512476
  }
 */

//Takes value in epoch.
function getNextDailyBarTime(epochTime) {
  // const date = new Date(barTime);
  // date.setDate(date.getDate() + 1);
  // return date.getTime();
  if (String(epochTime).length === 13) {
    epochTime = Math.floor(epochTime / 1000);
  }

  // Add 60 seconds to the given epoch time
  let nextMinuteEpoch = epochTime + 60;

  // // Optionally, convert the result back to milliseconds
  nextMinuteEpoch *= 1000; // Uncomment this line if you need the result in milliseconds

  return nextMinuteEpoch;
}

const socket = io("ws://localhost:3001", { transports: ["websocket"] });

const channelToSubscription = new Map();

socket.on("connect", () => {
  console.log("[socket] Connected");
  // socket.emit('set_stock_channel_name', 'stock_channel');
});

socket.on("disconnect", (reason) => {
  console.log("[socket] Disconnected:", reason);
});

socket.on("error", (error) => {
  console.log("[socket] Error:", error);
});

socket.on("message_from_redis", (data) => {
  const dataInJSON = JSON.parse(data);

  const { symbol, ltp, chngPer, chng, close, timestamp, ltt } = dataInJSON;

  const tradePrice = parseFloat(ltp);
  const tradeTime = parseInt(ltt);

  const channelString = getChannelString(symbol);

  const subscriptionItem = channelToSubscription.get(channelString);

  if (subscriptionItem === undefined) {
    return;
  }

  const lastDailyBar = subscriptionItem.lastDailyBar;
  const nextDailyBarTime = getNextDailyBarTime(lastDailyBar.time);

  let bar;
  try {
    // If the candleStick is of next day.
    if (tradeTime >= nextDailyBarTime) {
      bar = {
        time: nextDailyBarTime,
        open: tradePrice,
        high: tradePrice,
        low: tradePrice,
        close: close,
      };
    } else {
      bar = {
        ...lastDailyBar,
        high: Math.max(lastDailyBar.high, tradePrice),
        low: Math.min(lastDailyBar.low, tradePrice),
        close: close,
      };
    }
  } catch (err) {
    console.error("err :", err);
  }
  subscriptionItem.lastDailyBar = bar;

  // Send data to every subscriber of that symbol
  subscriptionItem.handlers.forEach((handler) => {
    handler.subscribeBarCallBack(bar);
  });
});

export function subscribeOnStream(
  symbolInfo,
  resolution,
  onRealtimeCallback,
  subscriberUID,
  onResetCacheNeededCallback,
  lastDailyBar
) {
  // console.log("subscriberUid recieved : ", subscriberUID); // 3456_1_#_INR_#_1D

  const channelString = getChannelString(subscriberUID);
  // Construct a handler object.
  const handler = {
    id: subscriberUID,
    subscribeBarCallBack: onRealtimeCallback,
  };

  let subscriptionItem = channelToSubscription.get(channelString);

  if (subscriptionItem) {
    // Already subscribed to the channel, use the existing subscription
    subscriptionItem.handlers.push(handler);
    return;
  }

  subscriptionItem = {
    subscriberUID,
    resolution,
    lastDailyBar,
    handlers: [handler],
  };

  channelToSubscription.set(channelString, subscriptionItem);
  // console.log(
  //   "[subscribeBars]: Subscribe to streaming. Channel:",
  //   channelString,
  //   subscriptionItem
  // );
  socket.emit("SubAdd", { subs: [channelString] });
}

export function unsubscribeFromStream(subscriberUID) {
  // Find a subscription with id === subscriberUID
  for (const channelString of channelToSubscription.keys()) {
    const subscriptionItem = channelToSubscription.get(channelString);
    const handlerIndex = subscriptionItem.handlers.findIndex(
      (handler) => handler.id === subscriberUID
    );

    if (handlerIndex !== -1) {
      // Remove from handlers
      subscriptionItem.handlers.splice(handlerIndex, 1);

      if (subscriptionItem.handlers.length === 0) {
        // Unsubscribe from the channel if it is the last handler
        console.log(
          "[unsubscribeBars]: Unsubscribe from streaming. Channel:",
          channelString
        );
        socket.emit("SubRemove", { subs: [channelString] });
        channelToSubscription.delete(channelString);
        break;
      }
    }
  }
}
