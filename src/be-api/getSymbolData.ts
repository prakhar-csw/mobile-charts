import { IRequestBody, IStockInformation } from "@/app/utils/TVutilities";
import { getRequestBody, makePostRequest } from "@/app/utils/utilityFunctions";

export const getSymbolData = async (symbol: string) => {
  const url =
    `${process.env.HOST}/Search/SymbolSearch/1.0.0`;
  const body : IRequestBody = getRequestBody({
    searchString: symbol,
  });

  try {
    const response = await makePostRequest(url, {
      headers: {
        'X-ENCRYPT': 'false',
      },
      body: body,
    });

    const stockInfo : IStockInformation = response?.response?.data?.symbolList?.[0];
    return stockInfo;
  } catch (error) {
    console.error('Error happened while fetching the data');
  }
};
