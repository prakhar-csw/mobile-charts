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
import { subscribeOnStream, unsubscribeFromStream } from "./streaming";
import {
  CURRENCY_CODE,
  SESSION_HOLIDAYS,
  SESSION_TIME,
  SUPPORTED_RESOLUTIONS,
  TIMEZONE,
} from "../constants";
import {
  areArraysEqualLength,
  convertEpochToDateTime,
  debounce,
  getApiEP,
  transformResolutionAsPerBE,
} from "../utilityFunctions";

interface IOHLCVT {
  o: number[];
  h: number[];
  l: number[];
  c: number[];
  v: number[];
  t: number[];
}

interface IStockInformation {
  symbol: string;
  dispPriceTick: string;
  lotSize: string;
  multiplier: number;
  streamSym: string;
  nIssueRate: number;
  assetClass: string;
  sectorName: string;
  compName: string;
  token: string;
  divisor: string;
  mktSegId: string;
  coCode: string;
  marketCapType: string;
  series: string;
  exch: string;
  expiry: string;
  id: string;
  instName: string;
  surveillanceMsg: string;
  symbolToken: string;
  strikePrice: string;
  isin: string;
  option: string;
}

interface ISymbolSearchOption {
  description: string;
  exchange: string;
  full_name: string;
  symbol: string;
  type: string;
}

const checkDataLengthIsSame = (data: IOHLCVT): boolean => {
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

/**
 * Check if the epochTime is greater than the current Date-time.
 * @param epochTime
 * @returns epochtime
 */

const getToParameterForApiCall = (epochTime: number): number => {
  const toParamByTv = epochTime * 1000;
  const currentDate = new Date().getTime();

  if (toParamByTv >= currentDate) return currentDate / 1000;
  else return epochTime;
};

const constructDataForTradingViewApi = (
  ticksData: IOHLCVT,
  from: number,
  to: number
): Bar[] => {
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
      if (timeArr[i] >= from * 1000 && timeArr[i] < to * 1000) {
        const newObj = {
          time: timeArr[i],
          low: lowArr[i],
          high: highArr[i],
          open: openArr[i],
          close: closeArr[i],
          volume: volumeArr[i],
        };
        bars.push(newObj);
      }
    }
  }
  return bars;
};

const constructSymbolObjectForTradingView = (
  stockInformation: IStockInformation
): LibrarySymbolInfo => {
  const symbolInfo: LibrarySymbolInfo = {
    ticker: stockInformation.symbolToken as string,
    name: stockInformation.symbol as string,
    description: stockInformation.compName as string,
    type: stockInformation.instName as string,
    session: SESSION_TIME as string,
    session_holidays: SESSION_HOLIDAYS as string,
    timezone: TIMEZONE as Timezone,
    exchange: stockInformation.exch as string,
    listed_exchange: stockInformation.exch as string,

    currency_code: CURRENCY_CODE as string,
    minmov: 1 as number,
    pricescale: 100 as number,

    has_seconds: true as boolean,
    has_intraday: true as boolean,
    has_daily: true as boolean,
    has_weekly_and_monthly: true as boolean,

    visible_plots_set: "ohlcv" as VisiblePlotsSet,
    supported_resolutions: SUPPORTED_RESOLUTIONS as ResolutionString[],
    volume_precision: 2 as number,
    format: "1/10/.../10000000" as SeriesFormat,
  };

  return symbolInfo;
};

const constructSymbolSearchOptionForTradingView = (
  symbolSearchArrFromBE: any
): ISymbolSearchOption[] => {
  let symbolSearchOptionArray: ISymbolSearchOption[] = [];

  if (symbolSearchArrFromBE) {
    for (let i = 0; i < symbolSearchArrFromBE.length; i++) {
      const oldObj = symbolSearchArrFromBE[i];
      const newObj = {
        description: oldObj.Seo_symbol_s,
        exchange: oldObj._Exch_s,
        full_name: oldObj.CompName_t,
        symbol: oldObj.Ticker_t,
        type: oldObj.exchInstname_s,
      };
      symbolSearchOptionArray.push(newObj);
    }
  }
  console.log("dad ", symbolSearchOptionArray);
  return symbolSearchOptionArray;
};

const makeSearchApiCall = async (query: string): Promise<any> => {
  const endPoint = getApiEP("searchSymbol", `symbol=${query}`);
  console.log("endpoint : ", endPoint);

  const response = await fetch(endPoint);
  const data = response.json();

  return data;
};

const debouncedSearch = debounce(makeSearchApiCall, 300);

let config: DatafeedConfiguration;

const lastBarsCache = new Map();

export default {
  onReady: async (onReadyCallBack: OnReadyCallback) => {
    const endPoint = getApiEP("config");

    const response = await fetch(endPoint);
    const configurationData = await response.json();

    config = configurationData;

    setTimeout(() => onReadyCallBack(configurationData));
  },

  getServerTime: async (callback: ServerTimeCallback) => {
    if (!config || !config?.supports_time) {
      return;
    }
    const endPoint = getApiEP("time");

    const response = await fetch(endPoint);
    // TimeResponse in seconds.
    const timeResponse = await response.json();
    callback(timeResponse);
  },

  searchSymbols: async (
    userInput: string,
    exchange: string,
    symbolType: string,
    onResultReadyCallback: SearchSymbolsCallback
  ) => {
    console.log("[searchSymbols]: Method call", exchange, symbolType);
    console.log("userInput : ", userInput);
    const data = await debouncedSearch(userInput);

    console.log("data : ", data?.data);
    const newSymbols = constructSymbolSearchOptionForTradingView(data?.data);
    console.log("newSymbols : ", newSymbols);
    onResultReadyCallback(newSymbols);
  },

  resolveSymbol: async (
    symbolName: string,
    onSymbolResolvedCallback: ResolveCallback,
    onResolveErrorCallback: ErrorCallback,
    extension?: SymbolResolveExtension
  ) => {
    const endPoint = getApiEP("symbols", `symbol=${symbolName}`);

    const response = await fetch(endPoint);
    const stockInformation = await response.json();

    if (!stockInformation) {
      console.log("[resolveSymbol]: Cannot resolve symbol", symbolName);
      onResolveErrorCallback(
        new Error("Cannot resolve symbol" as string) as DOMException
      );
      return;
    }

    // Symbol information object
    const symbolInfo: LibrarySymbolInfo =
      constructSymbolObjectForTradingView(stockInformation);

    setTimeout(() => {
      onSymbolResolvedCallback(symbolInfo);
    }, 0);
  },

  getBars: async (
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    periodParams: PeriodParamsWithOptionalCountback,
    onHistoryCallback: HistoryCallback,
    onErrorCallback: ErrorCallback
  ) => {
    // Giving data in seconds
    const { from, to, firstDataRequest } = periodParams;
    let bars = <Bar[]>[];

    const fromInNormalDateTime = convertEpochToDateTime(from);
    // As per trading-view  range getBars recieve : [from, to)
    const toInNormalDateTime = convertEpochToDateTime(
      getToParameterForApiCall(to)
    );
    const transfromedResolution = transformResolutionAsPerBE(resolution);

    const TEST_FROM = "2019-10-15T05:30:00";
    const TEST_TO = "2024-03-18T14:09:16";
    const TEST_RESOLUTION = "1d";

    try {
      // const endPoint = getApiEP('history', `symbol=${symbolInfo.ticker}&from=${TEST_FROM}&to=${TEST_TO}&resolution=${TEST_RESOLUTION}`);
      const endPoint = getApiEP(
        "history",
        `symbol=${symbolInfo.ticker}&from=${fromInNormalDateTime}&to=${toInNormalDateTime}&resolution=${transfromedResolution}`
      );
      const response = await fetch(endPoint);

      const ticksData = await response.json();

      if (ticksData.infoMsg === "Request Failed;") {
        console.log(
          ticksData.infoMsg === "Request Failed;",
          !ticksData?.data,
          !ticksData?.data?.t?.length
        );
        console.log("Failed...");

        onHistoryCallback([], { noData: true } as HistoryMetadata);
      }

      bars = [
        ...bars,
        ...constructDataForTradingViewApi(ticksData.data, from, to),
      ];

      if (symbolInfo && bars.length && firstDataRequest) {
        lastBarsCache.set(`${symbolInfo.exchange}:${symbolInfo.name}`, {
          ...bars[bars.length - 1],
        });
      }

      console.log("bars : ", bars);

      onHistoryCallback(bars, { noData: false } as HistoryMetadata);
    } catch (error) {
      console.log("[getBars]: Get error", error);
      onErrorCallback(new Error(error as string) as DOMException);
    }
  },

  subscribeBars: (
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    onRealtimeCallback: SubscribeBarsCallback,
    subscriberUID: string,
    onResetCacheNeededCallback: () => void
  ) => {
    subscribeOnStream(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscriberUID,
      onResetCacheNeededCallback,
      lastBarsCache.get(`${symbolInfo.exchange}:${symbolInfo.name}`)
    );
  },

  unsubscribeBars: (subscriberUID: string) => {
    unsubscribeFromStream(subscriberUID);
  },
};
