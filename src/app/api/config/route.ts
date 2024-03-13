import { SUPPORTED_RESOLUTIONS } from "@/app/utils/constants";
import { NextRequest, NextResponse } from "next/server";
import { CurrencyItem, DatafeedConfiguration, DatafeedSymbolType, Exchange, LibrarySymbolInfo, ResolutionString, Unit } from "../../../../public/charting_library/charting_library";


/**
 * This api is responsible for creating the configuration for the trading view chart.
 * It is an important api if removed chart might not load.
 */


const getConfigData = (): DatafeedConfiguration => {
  return {
    currency_codes: ["INR"] as string[],
    // exchanges: [] as Exchange[], 
    supported_resolutions: SUPPORTED_RESOLUTIONS as ResolutionString[],
    supports_marks: false as boolean,
    supports_time: true as boolean,
    supports_timescale_marks: false as boolean,
    // symbols_grouping:{},
    // symbols_types:[] as DatafeedSymbolType[],
    // units:{} as Record<string, Unit[]>,
  };
};

export async function GET(request: NextRequest) {
  return NextResponse.json(getConfigData());
};