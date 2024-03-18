
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const timeResp  = Math.floor(new Date().getTime() / 1000);
    return NextResponse.json(timeResp);
  };