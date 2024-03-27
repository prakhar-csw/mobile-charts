import { EXCHANGE, RESOLUTION_MAPPING } from "./constants";

export const getParameterByName = (name: string): string => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};

export const areArraysEqualLength = (...arrays: any[][]): boolean => {
  if (arrays.length < 2) {
    // At least two arrays are required for comparison
    throw new Error("At least two arrays are required for comparison.");
  }

  const firstArrayLength = arrays[0].length;

  for (let i = 1; i < arrays.length; i++) {
    if (arrays[i].length !== firstArrayLength) {
      return false; // Arrays have different lengths
    }
  }

  return true; // All arrays have equal lengths
};

export const convertEpochToDateTime = (epochTime: number): string => {
  const date = new Date(epochTime * 1000); // converting it in millisecond
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  return formattedDateTime;
};

export const transformResolutionAsPerBE = (resolution: string): string => {
  let modifiedResolution = "";
  const numericalValue = resolution.slice(0, -1) as string;
  const unit = resolution.slice(-1) as string;
  let newUnit = "";

  if (unit in RESOLUTION_MAPPING) {
    newUnit = RESOLUTION_MAPPING[unit];
    modifiedResolution = numericalValue + newUnit;
  } else {
    newUnit = "m";
    modifiedResolution = resolution + newUnit;
  }

  return modifiedResolution;
};

export const getApiEP = (key: string, params?: string): string => {
  let EP = `/api/${key}`;
  if (params) EP = EP + "?" + params;
  return EP;
};

export const getChannelString = (ticker: string): string => {
  const stockCode = ticker.split("_")[0];
  const channelString = stockCode + "_" + EXCHANGE.NSE;
  return channelString;
};

export const debounce = <T extends (...args: any[]) => Promise<any>>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => Promise<ReturnType<T>>) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  let promiseResolve: ((value: ReturnType<T>) => void) | null = null;

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    return new Promise((resolve) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        const result = await func(...args);
        if (promiseResolve) {
          promiseResolve(result);
        }
        resolve(result);
      }, wait);
      promiseResolve = resolve;
    });
  };
};


export const addIntervalToEpoch = (epochTime: number, resolution: string) => {
  // Convert epoch time to seconds if it's in milliseconds
  if (String(epochTime).length === 13) {
      epochTime = Math.floor(epochTime / 1000);
  }

  let numericalValue = parseInt(resolution.slice(0, -1)); // Extract numerical value
  let unit:string = resolution.slice(-1); // Extract unit
  
  // If no numerical value is provided then consider it as 1.
  if(isNaN(numericalValue)){
    numericalValue = 1;
  }
  
  // In case of minute resolution string does not contain any suffix.
  if(!isNaN(parseInt(unit))){
      numericalValue = numericalValue * 10 + parseInt(unit);
      unit = '';
  }

  let nextEpoch;

  if (unit === 'S') {
      nextEpoch = epochTime + numericalValue; // Add seconds
  } else if (unit === 'D') {
      const date = new Date(epochTime * 1000);
      date.setDate(date.getDate() + numericalValue); // Add days
      nextEpoch = date.getTime() / 1000;
  } else if (unit === 'W') {
      const date = new Date(epochTime * 1000);
      date.setDate(date.getDate() + (7 * numericalValue)); // Add weeks (7 days)
      nextEpoch = date.getTime() / 1000;
  } else if (unit === 'M') {
      const date = new Date(epochTime * 1000);
      const nextMonthDate = new Date(date.getFullYear(), date.getMonth() + numericalValue, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
      nextEpoch = nextMonthDate.getTime() / 1000; // Add months
  } else {
      nextEpoch = epochTime + (60 * numericalValue); // Add minutes
  }

  return nextEpoch;
}
