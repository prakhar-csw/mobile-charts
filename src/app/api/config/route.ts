import { NextRequest, NextResponse } from "next/server";

/**
 * This api is responsible for creating the configuration for the trading view chart.
 * It is an important api if removed chart might not load.
 */


const getConfigData = () => {
  return {
    supports_search: true,
    supports_group_request: false,
    supports_marks: false,
    supports_timescale_marks: false,
    supports_time: false,
    supported_resolutions: ["D", "2D", "3D", "W", "3W", "M", "6M"],
  };
};

export async function GET(request: NextRequest) {
  return NextResponse.json(getConfigData());
}
