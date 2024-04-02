export interface IRequestBody {
  request: {
    data: object;
    appId: string;
  };
}

export interface IRequestOptions {
  headers?: Record<string, string>;
  body?: IRequestBody;
}

export interface IStockInformation {
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

export interface ITicks {
  infoID: string;
  data: {
    c: number[];
    t: number[];
    sym: string;
    v: number[];
    h: number[];
    l: number[];
    o: number[];
  };
  infoMsg: string;
  msgID: string;
  serverTime: string;
}

export interface IStockApiResponse {
  response: {
    infoID: string;
    data: {
      symbolList: [IStockInformation];
    };
    infoMsg: string;
    msgID: string;
    serverTime: string;
  };
}

export interface IOHLCVT {
  o: number[];
  h: number[];
  l: number[];
  c: number[];
  v: number[];
  t: number[];
}

export interface IStockInformation {
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

export interface ISymbolSearchOption {
  description: string;
  exchange: string;
  full_name: string;
  symbol: string;
  type: string;
}

export interface IHandler {
  id: string;
  subscribeBarCallBack: SubscribeBarsCallback;
}

export interface ISubscriptionItem {
  subscriberUID: string;
  resolution: string;
  lastDailyBar: Bar;
  handlers: IHandler[];
}
