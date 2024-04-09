import { IRequestBody, ITicks } from "@/app/utils/TVutilities";
import { getRequestBody, makePostRequest } from "@/app/utils/utilityFunctions";

export const getTicks = async (body: IRequestBody) => {
  const url = `${process.env.NEXT_PUBLIC_HOST}/chart`;
  try {
    const response = await makePostRequest(url, {
      body: body,
    });
    
    const ticksInfo: ITicks = response.response;
    return ticksInfo;
  } catch (err) {
    console.error("Error occured : ", err);
  }
};
