import { convertEpochToDateTime } from "../../../app/utils/utilityFunctions";
import { getTicks } from "../../../be-api/getTicks";
import { NextRequest, NextResponse } from "next/server";

export interface TicksInterface {
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

export const getResponse = (ticksInfo: TicksInterface) => {
  return {
      t: ticksInfo?.data?.t,
      o: ticksInfo?.data?.o,
      h: ticksInfo?.data?.h,
      l: ticksInfo?.data?.l,
      c: ticksInfo?.data?.c,
      v: ticksInfo?.data?.v,
      s: "ok",
  };
};

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get("symbol") || "";
  const from = request.nextUrl.searchParams.get("from") || "";
  const to = request.nextUrl.searchParams.get("to") || "";
  const resolution = request.nextUrl.searchParams.get("resolution") || "";


  try {
    const ticketInfo: TicksInterface = await getTicks(
      symbol,
      convertEpochToDateTime(from),
      convertEpochToDateTime(to),
      "5s"
    );

    console.log('ticketInfo in history route ',ticketInfo);

    if (!symbol) {
      return NextResponse.json({
        err: "Please provide the symbol",
      });
    }

    return NextResponse.json(ticketInfo);
  } catch (error) {
    console.error("Error occured in API");
  }
}
