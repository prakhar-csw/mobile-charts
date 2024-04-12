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
  { text: "1D", resolution: "1", description: "1 Day", title: "1D" },
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

export const TRADE_TYPE = {
  LTP: "LTP",
  DLTP: "DLTP",
}

export const IE_ACCESS_TOKEN = 'accessToken';

export const IE_APP_ID = 'ieAppId';

export const IE_TRADE_PRICE_TYPE = 'tradePriceType';

export const BACK_BUTTON_SVG_STRING = '<svg fill="#000000" height="24px" width="24px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 219.151 219.151" xml:space="preserve"> <g id="SVGRepo_bgCarrier" stroke-width="0"/> <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/> <g id="SVGRepo_iconCarrier"> <g> <path d="M109.576,219.151c60.419,0,109.573-49.156,109.573-109.576C219.149,49.156,169.995,0,109.576,0S0.002,49.156,0.002,109.575 C0.002,169.995,49.157,219.151,109.576,219.151z M109.576,15c52.148,0,94.573,42.426,94.574,94.575 c0,52.149-42.425,94.575-94.574,94.576c-52.148-0.001-94.573-42.427-94.573-94.577C15.003,57.427,57.428,15,109.576,15z"/> <path d="M94.861,156.507c2.929,2.928,7.678,2.927,10.606,0c2.93-2.93,2.93-7.678-0.001-10.608l-28.82-28.819l83.457-0.008 c4.142-0.001,7.499-3.358,7.499-7.502c-0.001-4.142-3.358-7.498-7.5-7.498l-83.46,0.008l28.827-28.825 c2.929-2.929,2.929-7.679,0-10.607c-1.465-1.464-3.384-2.197-5.304-2.197c-1.919,0-3.838,0.733-5.303,2.196l-41.629,41.628 c-1.407,1.406-2.197,3.313-2.197,5.303c0.001,1.99,0.791,3.896,2.198,5.305L94.861,156.507z"/> </g> </g> </svg>';
