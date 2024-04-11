import { IRequestBody, IRequestOptions } from "./TVutilities/TVutilities";
import { IE_APP_ID, IE_ACCESS_TOKEN } from "./constants";
import { getCookie } from "./storageHelper";
import { isDomLoaded } from "./utilityFunctions";

export const getApiEP = (key: string, params?: string): string => {
    // let EP = `${process.env.NEXT_PUBLIC_API_ADDRESS}${key}`;
    let EP = `/api/${key}`;
    if (params) EP = EP + "?" + params;
    return EP;
  };

export const getRequestBody = (data: object): IRequestBody => {
  return {
    request: {
      data,
      appId: getCookie(IE_APP_ID) as string,
    },
  };
};

export const makeGetRequest = async (
  url: string,
  options?: IRequestOptions
): Promise<any> => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-ENCRYPT": "false",
        "X-Auth-Key": isDomLoaded()
          ? (getCookie(IE_ACCESS_TOKEN) as string)
          : ("" as string),
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const makePostRequest = async (
  url: string,
  options?: IRequestOptions
): Promise<any> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-ENCRYPT": "false",
        "X-Auth-Key": isDomLoaded()
          ? (getCookie(IE_ACCESS_TOKEN) as string)
          : ("" as string),
        ...options?.headers,
      },
      body: JSON.stringify(options?.body),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to post data: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
