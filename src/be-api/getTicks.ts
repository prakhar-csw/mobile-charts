import { IRequestBody, ITicks } from "@/app/utils/TVutilities";
import { getRequestBody, makePostRequest } from "@/app/utils/utilityFunctions";

export const getTicks = async (
  symbol: string,
  start: string,
  end: string,
  interval: string
) => {
  const url = `${process.env.HOST}/chart`;
  const body: IRequestBody = getRequestBody({
    symbol: symbol,
    start: start,
    end: end,
    interval: interval,
  });

  try {
    const response = await makePostRequest(url, {
      headers: {
        "X-ENCRYPT": "false",
      },
      body: body,
    });

    const ticksInfo: ITicks = response.response;
    return ticksInfo;
  } catch (err) {
    console.error("Error occured : ", err);
  }
};
