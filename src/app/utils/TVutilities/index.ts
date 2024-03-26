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
import {
  CUSTOMIZED_TIME_FRAMES,
  DEFAULT_RESOLUTION,
  DEFAULT_TIME_FRAME,
  TIMEZONE,
} from "../constants";

let tvWidget: any = null;

export const initOnReady = (assetSymbol: string): void => {
  const widgetOptions: ChartingLibraryWidgetOptions = {
    //Widget configuration
    container: "tv_chart_container" as string,
    library_path: "charting_library/" as string,

    // Chart Configuration
    symbol: assetSymbol as string,
    interval: DEFAULT_RESOLUTION as ResolutionString,
    locale: <LanguageCode>getParameterByName("lang") || ("en" as string),
    timezone: TIMEZONE as Timezone,
    // timeframe: DEFAULT_TIME_FRAME as string,
    time_frames: CUSTOMIZED_TIME_FRAMES as TimeFrameItem[],

    // Data configuration
    datafeed: DataFeed as any,

    // Chart Size
    fullscreen: false as boolean,
    autosize: true as boolean,

    // UI configuration
    theme: <ThemeName>getParameterByName("theme") || ("light" as string),

    // Chart features
    disabled_features: (<ChartingLibraryFeatureset[]>[
      "show_percent_option_for_right_margin",
      "header_layouttoggle",
      "main_series_scale_menu",
      "screen rotation",
      "chart_template_storage",
      "header_saveload",
      "header_fullscreen_button",
      "header_undo_redo",
      "header_settings",
      "header_screenshot",
      "snapshot_trading_drawings",
      "header_compare",
      "header_symbol_search",
      "header_quick_search",
      "left_toolbar",
      "use_localstorage_for_settings",
      "save_chart_properties_to_local_storage",
    ]) as ChartingLibraryFeatureset[],
    enabled_features: <ChartingLibraryFeatureset[]>[
      "seconds_resolution",
      "border_around_the_chart",
    ],

    // Saving and loading chart
    charts_storage_url: "https://saveloadctradingview.com" as string,
    charts_storage_api_version: "1.1" as AvailableSaveloadVersions,
    client_id: "tradingview.com" as string,
    user_id: "public_user_id" as string,
    // debug:true
  };

  tvWidget = new widget(widgetOptions as any);

  tvWidget.onChartReady(function () {
    tvWidget.headerReady().then(() => {
      const button = tvWidget.createButton();
      button.setAttribute("title", "Back Button");
      button.classList.add("apply-common-tooltip");
      button.addEventListener("click", () =>
        tvWidget.showNoticeDialog({
          title: "Notification",
          body: "TradingView Charting Library API works correctly",
          callback: () => {
            console.log("Noticed!");
          },
        })
      );

      button.innerHTML = "Check API";
    });
  });
  window.frames[0].focus();
};

export const removeWhenExit = () => {
  if (tvWidget) tvWidget.remove();
};
