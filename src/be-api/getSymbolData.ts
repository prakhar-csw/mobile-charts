import { IRequestBody, IStockInformation } from "@/app/utils/TVutilities";
import { getRequestBody, makePostRequest } from "@/app/utils/utilityFunctions";

export const getSymbolData = async (symbol: string) => {
  const url = `${process.env.NEXT_PUBLIC_HOST}/Search/Discovery/1.0.0`;
  const body: IRequestBody = getRequestBody({
    searchString: symbol,
  });

  try {
    // console.log('hit ------------- ')
    // const response = await makePostRequest(url, {
    //   body: body,
    // });

    // const stockInfo : IStockInformation = response?.response?.data?.symbolList?.[0];
    // console.log('stockInfo =============== ',stockInfo);
    // return stockInfo;

    return {
      symbol: "TATAMOTORS",
      streamSym: "3456_NSE",
      nIssueRate: 0,
      assetClass: "Cash",
      compName: "TATA MOTORS LIMITED",
      divisor: "1",
      mktSegId: "1",
      coCode: "560.0",
      marketCapType: "Large Cap",
      expiry: "",
      id: "STK_TATAMOTORS_EQ_NSE",
      surveillanceMsg: "",
      dispPriceTick: "0.05",
      lotSize: "1",
      multiplier: 1,
      sectorName: "Automobile",
      token: "3456",
      series: "EQ",
      exch: "NSE",
      expiryDateOnly: 0,
      instName: "EQUITIES",
      symbolToken: "3456_1",
      isin: "INE155A01022",
      strikePrice: "0",
      option: "",
    };
  } catch (error) {
    console.error("Error happened while fetching the data");
  }
};
