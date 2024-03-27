export const DATA_FEED_URL = "http://localhost:3000/api";

export const DUMMY_SYMBOL = "TATAMOTORS";

export const TIMEZONE = "Asia/Kolkata";

export const CURRENCY_CODE = "INR";

export const SESSION_TIME = "0915-1530";

export const SUPPORTED_RESOLUTIONS = ["5S", "15S","30S", "1", "1D"];

export const DEFAULT_RESOLUTION = "1";

export const DEFAULT_TIME_FRAME = '1D';

// export const SUPPORTED_RESOLUTIONS = ['5S','15S','30S','1','2','3','4','5','10','15','20','25','30','45','60','75','120','125','180','240','1D','1W'];

export const CUSTOMIZED_TIME_FRAMES = [
  { text: "4Y", resolution: "1D", description: "4 Years", title: "4Y" },
  { text: "3Y", resolution: "1D", description: "3 Years", title: "3Y" },
  { text: "1y", resolution: "1D", description: "1 Year", title: "1Y" },
  { text: "6M", resolution: "1D", description: "6 Month", title: "6M" },
  { text: "3M", resolution: "1D", description: "3 Month", title: "3M" },
  { text: "1M", resolution: "60", description: "1 Month", title: "1M" },
  { text: "1W", resolution: "30", description: "1 Week", title: "1W" },
  { text: "1D", resolution: "1", description: "3 Day", title: "1D" },
];

export const SESSION_HOLIDAYS =
  "20230126,20230307,20230330,20230404,20230407,20230414,20230501,20230629,20230815,20230919,20231002,20231024,20231114,20231127,20231225,20240122,20240126,20240308,20240325,20240329,20240410,20240417,20240501,20240617,20240717,20240815,20241002,20241101,20241115,20241225";

export const RESOLUTION_MAPPING: { [key: string]: string } = {
  S: <string>"s", //second
  D: <string>"d", // day
  W: <string>"W", // week
  M: <string>"M", // month
};

export const EXCHANGE: { [key: string]: string } = {
  NSE: "NSE",
  BSE: "BSE",
};

// export const SOCKET_ADDRESS:string = 'ws://localhost:4000';

export const SOCKET_ADDRESS:string = 'wss://ltjclsjd-4000.inc1.devtunnels.ms/';