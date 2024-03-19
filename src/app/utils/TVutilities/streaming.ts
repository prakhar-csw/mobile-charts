import { io } from "socket.io-client";

import { getChannelString } from "../utilityFunctions";
import {
  Bar,
  IDatafeedChartApi,
  LibrarySymbolInfo,
  QuotesCallback,
  SubscribeBarsCallback,
} from "../../../../public/charting_library/charting_library";
import { SOCKET_PORT } from "../constants";

interface IHandler {
  id: string;
  subscribeBarCallBack: SubscribeBarsCallback;
}

interface ISubscriptionItem {
  subscriberUID: string;
  resolution: string;
  lastDailyBar: Bar;
  handlers: IHandler[];
}

const channelToSubscription = new Map<string, any>();

let stock_channel: string = "";

const setStockChannelName = (symbolInfo: LibrarySymbolInfo) => {
  if (symbolInfo) {
    const id = symbolInfo?.ticker?.split("_")[0];
    stock_channel = `LTP-${id}-${symbolInfo.exchange}`;
    console.log("stock_channel : ", stock_channel);
  }
};

//Takes value in epoch.
const getNextDailyBarTime = (barTime: number): number => {
  const date = new Date(barTime * 1000);
  date.setDate(date.getDate() + 1);
  return date.getTime() / 1000;
};

const getNextMinuteBarTime = (barTime: number): number =>{
  if (String(barTime).length === 13) {
    barTime = Math.floor(barTime / 1000);
  }
  let nextMinuteEpoch = barTime + 60;
  nextMinuteEpoch *= 1000;

  return nextMinuteEpoch;
}

const socket = io(`ws://localhost:${SOCKET_PORT}`, {
  transports: ["websocket"],
});

socket.on("connect", () => {
  if (stock_channel) socket.emit("set_stock_channel_name", stock_channel);
});

socket.on("disconnect", (reason) => {});

socket.on("error", (error) => {
  console.error("[socket] Error:", error);
});

socket.on("message_from_redis", (data) => {
  const dataInJSON = JSON.parse(data);
  // console.log("[socket] Message:", dataInJSON);

  const { symbol, ltp, chngPer, chng, close, timestamp, ltt } = dataInJSON;

  const tradePrice = parseFloat(ltp);
  const tradeTime = parseInt(ltt);
  const channelString = getChannelString(symbol);

  console.log("tradePrice : ", tradePrice,"tradeTime : ", tradeTime,"channel string : ", channelString);

  const subscriptionItem = channelToSubscription.get(channelString);

  if (subscriptionItem === undefined) {
    return;
  }

  const lastBar = subscriptionItem.lastDailyBar;
  const resolution = subscriptionItem.resolution;

  console.log("lastBar : ", lastBar);

  if (!lastBar) return;

  let nextBarTime;

  if(resolution === '1')
    nextBarTime = getNextMinuteBarTime(lastBar?.time);
  else 
    nextBarTime = getNextDailyBarTime(lastBar?.time);

  console.log('nextBarTime : ', nextBarTime);

  let bar: Bar = {
    time: 0,
    open: 0,
    high: 0,
    low: 0,
    close: 0,
  };

  try {
    if (tradeTime >= nextBarTime) {
      console.log("in if");
      bar = {
        time: nextBarTime,
        open: tradePrice,
        high: tradePrice,
        low: tradePrice,
        close: tradePrice,
      };
    } else {
      console.log("in else");
      bar = {
        ...lastBar,
        high: Math.max(lastBar?.high, tradePrice),
        low: Math.min(lastBar?.low, tradePrice),
        close: tradePrice,
      };
    }
  } catch (err) {
    console.error("Error is : ", err);
  }
  subscriptionItem.lastDailyBar = bar;

  console.log("bar generated : ", bar);

  // Send data to every subscriber of that symbol
  subscriptionItem.handlers.forEach((handler: IHandler) =>
    handler.subscribeBarCallBack(bar as Bar)
  );
});

export function subscribeOnStream(
  symbolInfo: LibrarySymbolInfo,
  resolution: string,
  onRealtimeCallback: SubscribeBarsCallback,
  subscriberUID: string,
  onResetCacheNeededCallback: () => void,
  lastDailyBar: Bar
) {
  console.log("symbolInfo : ", symbolInfo);
  setStockChannelName(symbolInfo);
  console.log("subscriberUid : ", subscriberUID); // 3456_1_#_INR_#_1D

  const channelString = getChannelString("" + subscriberUID);

  console.log("channel String : ", channelString);

  // Construct a handler object.
  const handler: IHandler = {
    id: subscriberUID,
    subscribeBarCallBack: onRealtimeCallback,
  };

  let subscriptionItem: ISubscriptionItem =
    channelToSubscription.get(channelString);

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
  socket.emit("SubAdd", { subs: [channelString] });
}

export function unsubscribeFromStream(subscriberUID: string) {
  // Find a subscription with id === subscriberUID
  const channelToSubscriptionKeys =
    channelToSubscription.keys() as unknown as string[];
  for (const channelString of channelToSubscriptionKeys) {
    const subscriptionItem = channelToSubscription.get(channelString);
    const handlerIndex = subscriptionItem.handlers.findIndex(
      (handler: IHandler) => handler.id === subscriberUID
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