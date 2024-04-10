import { ITicks } from "@/app/utils/TVutilities/TVutilities.d";
import { getTicks } from "../../../be-api/getTicks";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body) {
      return NextResponse.json({
        err: "Please provide the symbol",
      });
    }

    const ticketInfo: ITicks | undefined = await getTicks(body);

    return NextResponse.json(ticketInfo);
  } catch (error) {
    console.error("Error occured in API");
  }
}