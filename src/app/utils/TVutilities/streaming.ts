import { io } from "socket.io-client";

import { isDomLoaded } from "../utilityFunctions";

import { addIntervalToEpoch, getChannelString } from "./TVHelpers";
import {
  Bar,
  LibrarySymbolInfo,
  SubscribeBarsCallback,
} from "../../../../public/charting_library/charting_library";
import { IHandler, ISubscriptionItem } from "../TVutilities/TVutilities.d";
import { getCookie } from "../storageHelper";
import { IE_ACCESS_TOKEN, IE_TRADE_PRICE_TYPE } from "../constants";
import { Socket } from "socket.io-client";

const channelToSubscription = new Map<string, any>();
let socket: Socket;

if (isDomLoaded()) {
  socket = io(process.env.NEXT_PUBLIC_SOCKET_ADDRESS as string, {
    transports: ["websocket"],
    extraHeaders: {
      "X-Auth-Key": getCookie(IE_ACCESS_TOKEN),
    },
  });

  socket.on("connect", () => {
    console.log("socket connection established");
  });

  socket.on("disconnect", (reason) => {
    console.log("socket connection demolished");
  });

  socket.on("error", (error) => {
    console.error("[socket] Error:", error);
  });

  socket.on("message_from_redis", (data) => {
    const dataInJSON = JSON.parse(data);

    let { symbol, ltp, chngPer, chng, close, timestamp, ltt } = dataInJSON;

    const channelString = getChannelString(symbol);
    const subscriptionItem = channelToSubscription.get(channelString);

    if (subscriptionItem === undefined) {
      return;
    }

    const _timeStamp = new Date(timestamp);
    const tradeTime = Math.floor(_timeStamp.getTime());
    let tradePrice = parseFloat(ltp);

    const lastBar = subscriptionItem.lastDailyBar;
    const resolution = subscriptionItem.resolution;

    if (!lastBar) {
      return;
    }

    let nextBarTime = addIntervalToEpoch(lastBar?.time, resolution);

    let bar: Bar = {
      time: 0,
      open: 0,
      high: 0,
      low: 0,
      close: 0,
    };

    // If the trade price in the live tick is not there means no change from previous price.
    if (!tradePrice) {
      tradePrice = lastBar?.close;
    }

    try {
      if (tradeTime >= nextBarTime) {
        bar = {
          time: nextBarTime,
          open: tradePrice,
          high: tradePrice,
          low: tradePrice,
          close: tradePrice,
        };
      } else {
        bar = {
          ...lastBar,
          high: Math.max(lastBar?.high, tradePrice),
          low: Math.min(lastBar?.low, tradePrice),
          close: tradePrice,
        };
      }
      subscriptionItem.lastDailyBar = bar;
    } catch (err) {
      console.error("Error is : ", err);
    }

    // Send data to every subscriber of that symbol
    subscriptionItem.handlers.forEach((handler: IHandler) =>
      handler.subscribeBarCallBack(bar as Bar)
    );
  });
}

const setStockChannelToSocket = (symbolInfo: LibrarySymbolInfo) => {
  if (symbolInfo) {
    const id = symbolInfo?.ticker?.split("_")[0];
    const tradeType = getCookie(IE_TRADE_PRICE_TYPE);
    const stock_channel = `${tradeType}-${id}-${symbolInfo.exchange}`;
    const stock_symbol = `${id}_${symbolInfo.exchange}`;
    socket.emit("set_stock_channel_name", {
      stock_channel: stock_channel,
      stock_symbol: stock_symbol,
    });
  }
};

export function subscribeOnStream(
  symbolInfo: LibrarySymbolInfo,
  resolution: string,
  onRealtimeCallback: SubscribeBarsCallback,
  subscriberUID: string,
  onResetCacheNeededCallback: () => void,
  lastDailyBar: Bar
) {
  setStockChannelToSocket(symbolInfo);
  const channelString = getChannelString("" + subscriberUID);
  // Construct a handler object.
  const handler: IHandler = {
    id: subscriberUID,
    subscribeBarCallBack: onRealtimeCallback,
  };

  let subscriptionItem: ISubscriptionItem =
    channelToSubscription.get(channelString);

  subscriptionItem = {
    subscriberUID,
    resolution,
    lastDailyBar: lastDailyBar,
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
