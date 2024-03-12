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

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get("symbol") || "";
  const from = request.nextUrl.searchParams.get("from") || "";
  const to = request.nextUrl.searchParams.get("to") || "";
  const resolution = request.nextUrl.searchParams.get("resolution") || "";


  try {
    const ticketInfo: TicksInterface = await getTicks(
      symbol,
      from,
      to,
      resolution,
    );

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
