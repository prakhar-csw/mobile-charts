import { ITicks } from "@/app/utils/TVutilities";
import { convertEpochToDateTime } from "../../../app/utils/utilityFunctions";
import { getTicks } from "../../../be-api/getTicks";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get("symbol") || "";
  const from = request.nextUrl.searchParams.get("from") || "";
  const to = request.nextUrl.searchParams.get("to") || "";
  const resolution = request.nextUrl.searchParams.get("resolution") || "";

  try {
    const ticketInfo: ITicks | undefined = await getTicks(
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