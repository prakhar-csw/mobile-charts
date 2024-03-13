import {
  Bar,
  DatafeedConfiguration,
  HistoryCallback,
  HistoryMetadata,
  LibrarySymbolInfo,
  OnReadyCallback,
  ResolutionString,
  ResolveCallback,
  SearchSymbolsCallback,
  SeriesFormat,
  ServerTimeCallback,
  SubscribeBarsCallback,
  SymbolResolveExtension,
  Timezone,
  VisiblePlotsSet,
} from "../../../../public/charting_library/charting_library";
import { PeriodParamsWithOptionalCountback } from "../../../../public/datafeeds/udf/src/history-provider";
import { SUPPORTED_RESOLUTIONS, getApiEP } from "../constants";
import {
  areArraysEqualLength,
  convertEpochToDateTime,
} from "../utilityFunctions";

interface OHLCVT {
    o: number[],
    h: number[],
    l: number[],
    c: number[],
    v: number[],
    t: number[],
};

const checkDataLengthIsSame = (data: OHLCVT ): boolean => {
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

const constructDataForTradingViewApi = (ticksData : OHLCVT) : Bar[] => {
  const dataLengthIsSame = checkDataLengthIsSame(ticksData);
  let bars = <Bar[]>[];
  if (dataLengthIsSame) {
    const length = ticksData?.c?.length;

    const timeArr = ticksData?.t;
    const openArr = ticksData?.o;
    const highArr = ticksData?.h;
    const lowArr = ticksData?.l;
    const closeArr = ticksData?.c;
    const volumeArr = ticksData?.v;

    for (let i = 0; i < length; i++) {
      const newObj = {
        time: timeArr[i] * 1000,
        low: lowArr[i],
        high: highArr[i],
        open: openArr[i],
        close: closeArr[i],
        volume: volumeArr[i],
      };
      bars.push(newObj);
    }
  }
  return bars;
};

let config: DatafeedConfiguration;

export default {
  onReady: async (onReadyCallBack: OnReadyCallback) => {
    const endPoint = getApiEP('config');

    const response = await fetch(endPoint);
    const configurationData = await response.json();

    config = configurationData;

    setTimeout(() => onReadyCallBack(configurationData));
  },

  searchSymbols: (
    userInput: string,
    exchange: string,
    symbolType: string,
    onResult: SearchSymbolsCallback
  ) => {
    console.log("[searchSymbols]: Method call");
  },

  resolveSymbol: async (
    symbolName: string,
    onSymbolResolvedCallback: ResolveCallback,
    onResolveErrorCallback: ErrorCallback,
    extension?: SymbolResolveExtension
  ) => {
    
    const endPoint = getApiEP('symbols', `symbol=${symbolName}`);

    const response = await fetch(endPoint);
    const stockInformation = await response.json();

    if (!stockInformation) {
      console.log("[resolveSymbol]: Cannot resolve symbol", symbolName);
      onResolveErrorCallback(new Error("Cannot resolve symbol" as string) as DOMException);
      return;
    }

    // Symbol information object
    const symbolInfo : LibrarySymbolInfo = {
      ticker: stockInformation.streamSym as string,
      name: stockInformation.symbol as string,
      description: stockInformation.compName as string,
      type: stockInformation.instName as string,
      session: "0915-1600" as string,
      timezone: "Asia/Kolkata" as Timezone,
      exchange: stockInformation.exch as string,
      minmov: 1 as number,
      pricescale: 100 as number,
      has_intraday: true as boolean,
      visible_plots_set: "ohlc" as VisiblePlotsSet,
      has_weekly_and_monthly: false as boolean,
      supported_resolutions: SUPPORTED_RESOLUTIONS as ResolutionString[],
      volume_precision: 2 as number,
      data_status: "streaming",
      has_seconds: true as boolean,
      listed_exchange: stockInformation.exch as string,
      format: '1/10/.../10000000' as SeriesFormat,
    } ;

    setTimeout(() => {
      onSymbolResolvedCallback(symbolInfo);
    }, 0);
  },

  getBars: async (
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    periodParams: PeriodParamsWithOptionalCountback,
    onHistoryCallback: HistoryCallback,
    onErrorCallback: ErrorCallback,
  ) => {
    const { from, to, firstDataRequest } = periodParams;
    console.log(from, to, "period");

    const fromInNormalDateTime = convertEpochToDateTime(from);
    const toInNormalDateTime = convertEpochToDateTime(to);

    try {

      const endPoint = getApiEP('history', `symbol=${symbolInfo.ticker}&from=${fromInNormalDateTime}&to=${toInNormalDateTime}&resolution=5s`);
      const response = await fetch(endPoint);

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

        onHistoryCallback([], { noData: true } as HistoryMetadata);
      }

      let bars = <Bar[]> constructDataForTradingViewApi(ticksData.data);

      bars.reverse();

      if (bars.length) {
        onHistoryCallback(bars, {noData: false} as HistoryMetadata);
      } else {
        onHistoryCallback([], { noData: true } as HistoryMetadata);
      }

    } catch (error) {
      console.log("[getBars]: Get error", error);
      onErrorCallback(new Error(error as string) as DOMException);
    }
  },

  getServerTime: async (callback: ServerTimeCallback) => {
    if (!config || !config?.supports_time) {
      return;
    }
    const endPoint = getApiEP('time');

    const response = await fetch(endPoint);
    const timeResponse = await response.json();
    callback(parseInt(timeResponse));
  },

  subscribeBars: (
    symbolInfo: LibrarySymbolInfo, resolution: ResolutionString, //onTick: SubscribeBarsCallback, listenerGuid: string, _onResetCacheNeededCallback: () => void
    onRealtimeCallback: SubscribeBarsCallback,
    subscriberUID: string,
    onResetCacheNeededCallback: () => void,
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

  unsubscribeBars: (subscriberUID: string) => {
    console.log(
      "[unsubscribeBars]: Method call with subscriberUID:",
      subscriberUID
    );
    // unsubscribeFromStream(subscriberUID);
  },
};
