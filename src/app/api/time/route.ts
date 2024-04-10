import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const timeResponse = {
    time: Math.floor(new Date().getTime() / 1000),
  };
  return NextResponse.json(timeResponse);
}
