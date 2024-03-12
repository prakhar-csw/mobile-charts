import { SUPPORTED_RESOLUTIONS } from "@/app/utils/constants";
import { NextRequest, NextResponse } from "next/server";


/**
 * This api is responsible for creating the configuration for the trading view chart.
 * It is an important api if removed chart might not load.
 */


const getConfigData = () => {
  return {
    // currency_codes: ["INR"],
    // exchanges:[],
    // supported_resolutions:[],
    supports_marks: false,
    supports_time: true,
    supports_timescale_marks: false,
    // supports_timescale_marks: false,
    // symbols_grouping:{},
    // symbols_types:[]
    // unit:{},
    supports_search: false,
    supports_group_request: false,
    supported_resolutions: SUPPORTED_RESOLUTIONS,
  };
};

export async function GET(request: NextRequest) {
  return NextResponse.json(getConfigData());
};