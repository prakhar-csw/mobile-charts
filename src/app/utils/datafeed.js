import { SUPPORTED_RESOLUTIONS } from "./constants";
import { areArraysEqualLength, convertEpochToDateTime } from "./utilityFunctions";

const checkDataLengthIsSame = (data) => {
  if (data && data?.o && data?.h && data?.l && data?.c && data?.v && data?.t) {
    return areArraysEqualLength(
      data?.o,
      data?.h,
      data?.l,
      data?.c,
      data?.v,
      data?.t
    );
  } else {
    return false;
  }
};

const constructDataForTradingViewApi = (ticksData) => {
  const dataLengthIsSame = checkDataLengthIsSame(ticksData.data);
  let bars = [];
  if (dataLengthIsSame) {
    const length = ticksData?.data?.c?.length;

    const timeArr = ticksData?.data?.t;
    const openArr = ticksData?.data?.o;
    const highArr = ticksData?.data?.h;
    const lowArr = ticksData?.data?.l;
    const closeArr = ticksData?.data?.c;
    const volumeArr = ticksData?.data?.v;

    for (let i = 0; i < length; i++) {
      const newObj = {
        time: parseInt(timeArr[i]),
        low: parseFloat(lowArr[i]),
        high: parseFloat(highArr[i]),
        open: parseFloat(openArr[i]),
        close: parseFloat(closeArr[i]),
        volume: parseInt(volumeArr[i]),
      };
      bars.push(newObj);
    }
  }
  return bars;
};

let config = null;

export default {
  onReady: async (onReadyCallBack) => {
    const response = await fetch("/api/config");
    const configurationData = await response.json();

    config = configurationData;

    setTimeout(() => onReadyCallBack(configurationData));
  },

  searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
    console.log("[searchSymbols]: Method call");
  },

  resolveSymbol: async (
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback,
    extension
  ) => {
    const response = await fetch(`/api/symbols?symbol=${symbolName}`);
    const stockInformation = await response.json();

    if (!stockInformation) {
      console.log("[resolveSymbol]: Cannot resolve symbol", symbolName);
      onResolveErrorCallback("Cannot resolve symbol");
      return;
    }
    // Symbol information object
    const symbolInfo = {
      ticker: stockInformation.streamSym,
      name: stockInformation.symbol,
      description: stockInformation.compName,
      type: stockInformation.instName,
      session: "0915-1600",
      timezone: "Asia/Kolkata",
      exchange: stockInformation.exch,
      minmov: 1,
      pricescale: 100,
      has_intraday: true,
      visible_plots_set: "ohlc",
      has_weekly_and_monthly: false,
      supported_resolutions: SUPPORTED_RESOLUTIONS,
      volume_precision: 2,
      data_status: "streaming",
      price: 'format',
      has_seconds: true,
    };

    setTimeout(() => {
      onSymbolResolvedCallback(symbolInfo)
    },0);
  },

  getBars: async (
    symbolInfo,
    resolution,
    periodParams,
    onHistoryCallback,
    onErrorCallback
  ) => {
    console.log("[getBars]: Method call", symbolInfo, resolution, "uuu");

    const { from, to, firstDataRequest } = periodParams;
    console.log(from, to, "period");

    const fromInNormalDateTime = convertEpochToDateTime(from);
    const toInNormalDateTime = convertEpochToDateTime(to);

    try {
      const response = await fetch(
        `/api/history?symbol=${symbolInfo.ticker}&from=${fromInNormalDateTime}&to=${toInNormalDateTime}&resolution=5s`
      );

      const ticksData = await response.json();

      if (
        ticksData.infoMsg === "Request Failed;" ||
        !ticksData?.data ||
        ticksData?.data?.t?.length === 0
      ) {
        console.log(
          ticksData.infoMsg === "Request Failed;",
          !ticksData?.data,
          !ticksData?.data?.t?.length
        );
        console.log("Failed...");

        // "noData" should be set if there is no data in the requested period
        onHistoryCallback([], { noData: true });
        return;
      }

      let bars = constructDataForTradingViewApi(ticksData);

      if (bars.length) {
        onHistoryCallback(bars.reverse(), { noData: false });
      } else {
        onHistoryCallback([], { noData: true });
      }

    } catch (error) {
      console.log("[getBars]: Get error", error);
      onErrorCallback(error);
    }
  },

  getServerTime: async (callback) => {
    if (!config.supports_time) {
      return;
    }
    const response = await fetch("/api/time");
    const timeResponse = await response.json();
    callback(parseInt(timeResponse));
  },

  subscribeBars: (
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscriberUID,
    onResetCacheNeededCallback
  ) => {
    console.log(
      "[subscribeBars]: Method call with subscriberUID:",
      subscriberUID
    );
    // subscribeOnStream(
    //     symbolInfo,
    //     resolution,
    //     onRealtimeCallback,
    //     subscriberUID,
    //     onResetCacheNeededCallback,
    //     lastBarsCache.get(`${symbolInfo.exchange}:${symbolInfo.name}`)
    // );
  },

  unsubscribeBars: (subscriberUID) => {
    console.log(
      "[unsubscribeBars]: Method call with subscriberUID:",
      subscriberUID
    );
    // unsubscribeFromStream(subscriberUID);
  },
};
