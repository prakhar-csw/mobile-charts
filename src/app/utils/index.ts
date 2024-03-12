import DataFeed from "../utils/datafeed.js";
import {
  AvailableSaveloadVersions,
  ChartingLibraryFeatureset,
  ChartingLibraryWidgetOptions,
  IBasicDataFeed,
  ResolutionString,
  widget,
} from "../../../public/charting_library";

import { getParameterByName } from "./utilityFunctions";

let tvWidget: any = null;

export const initOnReady = (datafeedUrl: string, assetSymbol: string): void => {
  const customDataUrl = getParameterByName("dataUrl");

  if (customDataUrl !== "") {
    datafeedUrl = customDataUrl.startsWith("https://")
      ? customDataUrl
      : `https://${customDataUrl}`;
  }

  const widgetOptions: ChartingLibraryWidgetOptions = {
    //Widget configuration
    container: "tv_chart_container" as string,
    library_path: "charting_library/" as string,

    // Chart Configuration
    symbol: assetSymbol as string,
    interval: "2" as ResolutionString,
    locale: <any>getParameterByName("lang") || ("en" as string),
    // timezone: "Asia/Kolkata",

    // Data configuration
    datafeed: DataFeed as any,
    // datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(
    //   datafeedUrl,
    //   "10000",
    //   {
    //     maxResponseLength: 200,
    //     expectedOrder: "latestFirst",
    //   }
    // ) as IBasicDataFeed,

    // Chart Size
    fullscreen: false as boolean,
    autosize: true as boolean,

    // UI configuration
    theme: <any>getParameterByName("theme") || ("dark" as string),

    // Chart features
    disabled_features: [
      "use_localstorage_for_settings",
    ] as ChartingLibraryFeatureset[],
    enabled_features: ["study_templates"] as ChartingLibraryFeatureset[],

    // Saving and loading chart
    charts_storage_url: "https://saveloadctradingview.com" as string,
    charts_storage_api_version: "1.1" as AvailableSaveloadVersions,
    client_id: "tradingview.com" as string,
    user_id: "public_user_id" as string,
    // debug:true
  };

  tvWidget = new widget(widgetOptions);

  tvWidget.onChartReady(function () {});
  window.frames[0].focus();
};

export const removeWhenExit = () => {
  if (tvWidget) tvWidget.remove();
};
