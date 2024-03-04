// export const getParameterByName = (name:string):string => {
//     name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
//     const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
//     const results = regex.exec(location.search);
//     return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
//   };

// export const initOnReady = (datafeedUrl:string):void => {
//     // var datafeedUrl = "https://demo-feed-data.tradingview.com";
//     var customDataUrl = getParameterByName('dataUrl');
//     if (customDataUrl !== "") {
//         datafeedUrl = customDataUrl.startsWith('https://') ? customDataUrl : `https://${customDataUrl}`;
//     }

//     var widget = window.tvWidget = new TradingView.widget({
//         // debug: true, // uncomment this line to see Library errors and warnings in the console
//         fullscreen: false,
//         symbol: 'AAPL',
//         interval:<any> '1D',
//         container: "tv_chart_container",
//         autosize:true,

//         //	BEWARE: no trailing slash is expected in feed URL
//         datafeed: new Datafeeds.UDFCompatibleDatafeed(datafeedUrl, undefined, {
//             maxResponseLength: 1000,
//             expectedOrder: 'latestFirst',
//         }),
//         library_path: "charting_library/",
//         locale:<any> getParameterByName('lang') || "en",

//         disabled_features: ["use_localstorage_for_settings"],
//         enabled_features: ["study_templates"],
//         charts_storage_url: 'https://saveload.tradingview.com',
//         charts_storage_api_version: "1.1",
//         client_id: 'tradingview.com',
//         user_id: 'public_user_id',
//         theme:<any> getParameterByName('theme'),
//     });
//     window.frames[0].focus();
// };

export const getParameterByName = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export const initOnReady = (datafeedUrl) => {
    var customDataUrl = getParameterByName('dataUrl');
    if (customDataUrl !== "") {
        datafeedUrl = customDataUrl.startsWith('https://') ? customDataUrl : `https://${customDataUrl}`;
    }

    var widget = window.tvWidget = new TradingView.widget({
        // debug: true, // uncomment this line to see Library errors and warnings in the console
        fullscreen: false,
        symbol: 'AAPL',
        interval: '1D',
        container: "tv_chart_container",
        autosize: true,

        //	BEWARE: no trailing slash is expected in feed URL
        datafeed: new Datafeeds.UDFCompatibleDatafeed(datafeedUrl, undefined, {
            maxResponseLength: 1000,
            expectedOrder: 'latestFirst',
        }),
        library_path: "charting_library/",
        locale: getParameterByName('lang') || "en",

        disabled_features: ["use_localstorage_for_settings"],
        enabled_features: ["study_templates"],
        charts_storage_url: 'https://saveload.tradingview.com',
        charts_storage_api_version: "1.1",
        client_id: 'tradingview.com',
        user_id: 'public_user_id',
        theme: getParameterByName('theme'),
    });
    window.frames[0].focus();
};