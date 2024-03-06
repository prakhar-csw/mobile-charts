import { ChartingLibraryWidgetOptions, ResolutionString, widget } from "../../../public/charting_library";

let tvWidget: any = null;

export const getParameterByName = (name:string):string => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    const results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

export const initOnReady = (datafeedUrl:string, assetSymbol:string):void => {
    const customDataUrl = getParameterByName('dataUrl');
    console.log('curds : ', datafeedUrl )

    if (customDataUrl !== "") {
        datafeedUrl = customDataUrl.startsWith('https://') ? customDataUrl : `https://${customDataUrl}`;
    }

    const widgetOptions: ChartingLibraryWidgetOptions = {
        fullscreen: false,
        symbol: assetSymbol,
        interval: '1D' as ResolutionString,
        container: "tv_chart_container",
        autosize:true,
        datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(
            datafeedUrl,
            undefined,
            {
                maxResponseLength: 1000,
                expectedOrder: "latestFirst",
            }
        ),
        library_path: "charting_library/",
        locale:<any> getParameterByName('lang') || "en",
    
        disabled_features: ["use_localstorage_for_settings"],
        enabled_features: ["study_templates"],
        charts_storage_url: 'https://saveload.tradingview.com',
        charts_storage_api_version: "1.1",
        client_id: 'tradingview.com',
        user_id: 'public_user_id',
        theme:<any> getParameterByName('theme'),
    };



    tvWidget = new widget(widgetOptions);
    console.log('tvWidget: ',tvWidget)
    tvWidget.onChartReady(() => {
        tvWidget.headerReady().then(() => {
            const button = tvWidget.createButton();
            button.setAttribute("title", "Click to show a notification popup");
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

export const removeWhenExit = ()=>{
    if(tvWidget)
        tvWidget.remove();
}