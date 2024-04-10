import { IStockInformationInterface } from "@/app/utils/TVutilities/TVutilities.d";
import { getSymbolData } from "../../../be-api/getSymbolData";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json();
    if (!body) {
      return NextResponse.json({
        err: "Please provide the symbol",
      });
    }
    const stockInformation: IStockInformationInterface | undefined =
      await getSymbolData(body);
    return NextResponse.json(stockInformation);
  } catch (err) {
    console.error("Error occured in api", err);
  }
}
