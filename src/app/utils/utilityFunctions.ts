import { ChartingLibraryWidgetOptions, IBasicDataFeed, ResolutionString, widget } from "../../../public/charting_library";

let tvWidget: any = null;

export const getParameterByName = (name:string):string => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    const results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

export const initOnReady = (datafeedUrl:string, assetSymbol:string):void => {
    const customDataUrl = getParameterByName('dataUrl');

    if (customDataUrl !== "") {
        datafeedUrl = customDataUrl.startsWith('https://') ? customDataUrl : `https://${customDataUrl}`;
    }

    const widgetOptions: ChartingLibraryWidgetOptions = {
        //Widget configuration
        container: "tv_chart_container",
        library_path: "charting_library/",
        
        // Chart Configuration
        symbol: assetSymbol,
        interval: '1D' as ResolutionString, 
        locale:<any> getParameterByName('lang') || "en",   
        
        // Data configuration
        // datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(
        //     datafeedUrl,
        //     5000,
        //     {
        //         maxResponseLength: 1000,
        //         expectedOrder: "latestFirst",
        //     }
        // ) as IBasicDataFeed,
        datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(datafeedUrl) as IBasicDataFeed,

        // Chart Size
        fullscreen: false,
        autosize:true,

        // UI configuration
        theme:<any> getParameterByName('theme') || 'dark',
        
        // Chart features
        disabled_features: ["use_localstorage_for_settings"],
        enabled_features: ["study_templates"],

        // Saving and loading chart
        charts_storage_url: 'https://saveloadctradingview.com',
        charts_storage_api_version: "1.1",
        client_id: 'tradingview.com',
        user_id: 'public_user_id',
    };

    tvWidget = new widget(widgetOptions);

    tvWidget.onChartReady(function(){});
    window.frames[0].focus();
};

export const removeWhenExit = ()=>{
    if(tvWidget)
        tvWidget.remove();
}


export const convertEpochToDateTime = (epochTime: string): string => {
    const epochTimeInNumber = parseInt(epochTime);
    
    const date = new Date(epochTimeInNumber * 1000); // Convert seconds to milliseconds
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
}