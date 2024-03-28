import { ApiResponse, dummySearchResult } from "@/mock-data/search-api-mock-data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const symbol: string = request.nextUrl.searchParams.get("symbol") || "";
  if (!symbol) {
    return NextResponse.json({
      err: "Please provide the symbol",
    });
  }
  const searchResult: ApiResponse = dummySearchResult ;
  return NextResponse.json(searchResult);
}
