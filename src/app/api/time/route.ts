
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const timeResp  = new Date().getTime();
    return NextResponse.json(timeResp);
  };