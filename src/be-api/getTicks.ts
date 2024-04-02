import { IRequestBody, ITicks } from "@/app/utils/TVutilities";
import { getRequestBody, makePostRequest } from "@/app/utils/utilityFunctions";

export const getTicks = async (
  symbol: string,
  start: string,
  end: string,
  interval: string
) => {
  const url = `${process.env.NEXT_PUBLIC_HOST}/chart`;
  const body: IRequestBody = getRequestBody({
    symbol: symbol,
    start: start,
    end: end,
    interval: interval,
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
       'Content-Type': 'application/json',
       'X-ENCRYPT': 'false',
      },
      body: JSON.stringify(body),
    });

    const responseData = await response.json();
    const ticksInfo: ITicks = responseData.response;
    return ticksInfo;
  } catch (err) {
    console.error("Error occured : ", err);
  }
};
