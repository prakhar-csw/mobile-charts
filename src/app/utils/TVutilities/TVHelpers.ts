import { Bar, CreateHTMLButtonOptions } from "../../../../public/charting_library/charting_library";
import { BACK_BUTTON_SVG_STRING, EXCHANGE } from "../constants";
import { areArraysEqualLength } from "../utilityFunctions";
import { ISymbolSearchOption, IOHLCVT } from "./TVutilities";

export const getChannelString = (ticker: string): string => {
  const stockCode = ticker.split("_")[0];
  const channelString = stockCode + "_" + EXCHANGE.NSE;
  return channelString;
};

export const addIntervalToEpoch = (epochTime: number, resolution: string) => {
  // Convert epoch time to seconds if it's in milliseconds
  if (String(epochTime).length === 13) {
    epochTime = Math.floor(epochTime / 1000);
  }

  let numericalValue: number = parseInt(resolution.slice(0, -1)); // Extract numerical value
  let unit: string = resolution.slice(-1); // Extract unit

  // If no numerical value is provided then consider it as 1.
  if (isNaN(numericalValue)) {
    numericalValue = 1;
  }

  // In case of minute resolution string does not contain any suffix.
  if (!isNaN(parseInt(unit))) {
    if (resolution.length > 1)
      numericalValue = numericalValue * 10 + parseInt(unit);
    unit = "";
  }

  let nextEpoch;

  if (unit === "S") {
    nextEpoch = epochTime + numericalValue; // Add seconds
  } else if (unit === "D") {
    const date = new Date(epochTime * 1000);
    date.setDate(date.getDate() + numericalValue); // Add days
    nextEpoch = date.getTime() / 1000;
  } else if (unit === "W") {
    const date = new Date(epochTime * 1000);
    date.setDate(date.getDate() + 7 * numericalValue); // Add weeks (7 days)
    nextEpoch = date.getTime() / 1000;
  } else if (unit === "M") {
    const date = new Date(epochTime * 1000);
    const nextMonthDate = new Date(
      date.getFullYear(),
      date.getMonth() + numericalValue,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    );
    nextEpoch = nextMonthDate.getTime() / 1000; // Add months
  } else {
    nextEpoch = epochTime + 60 * numericalValue; // Add minutes
  }

  return nextEpoch * 1000;
};

export const getTimeFrameForRespectiveResolution = (resolution: string) => {
  if (resolution.includes("D")) return 365; // 365 Days
  if (resolution.includes("S")) return 1 / 24; // 1 Hour
  else return 1; // 1 Day
};

export const constructSymbolSearchOptionForTradingView = (
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
  return symbolSearchOptionArray;
};

export const checkDataLengthIsSame = (data: IOHLCVT): boolean => {
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

export const constructDataForTradingViewApi = (
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
  return bars;
};

export const attachBackButtonToTVHeader = (tvWidget : any) => {
  const handleBackButtonClick = () => {
    console.log('back buitton clicked');
    (window as Window).ReactNativeWebView.postMessage('backButtonClicked');
  }
  const buttonOptions: CreateHTMLButtonOptions = {
    align: 'left',
    useTradingViewStyle: false
  }

  const button : HTMLButtonElement = tvWidget.createButton(buttonOptions);
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(BACK_BUTTON_SVG_STRING, "image/svg+xml");
  const svgElement = svgDoc.documentElement;

  button.setAttribute('id', 'back-button');
  button.appendChild(svgElement);
  button.addEventListener('click', handleBackButtonClick);

  // Find its parent element with a class starting with 'group-'
  const groupDiv = button?.closest('[class^="group-"]');
  if(groupDiv) {

    const separatorWrap = groupDiv?.nextElementSibling;
    if (separatorWrap) 
      separatorWrap.remove();
    
    (groupDiv as HTMLElement).style.order = '-2';
  }
}