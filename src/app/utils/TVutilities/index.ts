import DataFeed from "./datafeed";
import {
  AvailableSaveloadVersions,
  ChartingLibraryFeatureset,
  ChartingLibraryWidgetOptions,
  LanguageCode,
  ResolutionString,
  ThemeName,
  TimeFrameItem,
  Timezone,
  widget,
} from "../../../../public/charting_library";

import { getParameterByName } from "../utilityFunctions";
import { CUSTOMIZED_TIME_FRAMES, DEFAULT_RESOLUTION, DEFAULT_TIME_FRAME, TIMEZONE } from "../constants";

let tvWidget: any = null;

export const initOnReady = (datafeedUrl: string, assetSymbol: string): void => {

  const widgetOptions: ChartingLibraryWidgetOptions = {
    //Widget configuration
    container: "tv_chart_container" as string,
    library_path: "charting_library/" as string,

    // Chart Configuration
    symbol: assetSymbol as string,
    interval: DEFAULT_RESOLUTION as ResolutionString,
    locale: <LanguageCode>getParameterByName("lang") || ("en" as string),
    timezone: TIMEZONE as Timezone,
    timeframe: DEFAULT_TIME_FRAME as string,
    time_frames: CUSTOMIZED_TIME_FRAMES as TimeFrameItem[],

    // Data configuration
    datafeed: DataFeed as any,

    // Chart Size
    fullscreen: false as boolean,
    autosize: true as boolean,

    // UI configuration
    theme: <ThemeName>getParameterByName("theme") || ("dark" as string),

    // Chart features
    disabled_features: <ChartingLibraryFeatureset[]> [
      "use_localstorage_for_settings",
    ] as ChartingLibraryFeatureset[],
    enabled_features: <ChartingLibraryFeatureset[]> ["study_templates", "seconds_resolution"],

    // Saving and loading chart
    charts_storage_url: "https://saveloadctradingview.com" as string,
    charts_storage_api_version: "1.1" as AvailableSaveloadVersions,
    client_id: "tradingview.com" as string,
    user_id: "public_user_id" as string,
    // debug:true
  };

  tvWidget = new widget(widgetOptions as any);

  tvWidget.onChartReady(function () {});
  window.frames[0].focus();
};

export const removeWhenExit = () => {
  if (tvWidget) tvWidget.remove();
};
