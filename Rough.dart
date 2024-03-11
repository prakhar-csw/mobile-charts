// Chart configuration : https://www.tradingview.com/charting-library-docs/latest/ui_elements/Chart - disabled_features: [], enabled_feat

SRC : https://www.tradingview.com/charting-library-docs/latest/core_concepts/Widget-Constructor
To configure the chart look and feel.
  1. Configuration will be done in widgetOptions and using this widgetOptions we will create the TradingView Chart widget.



SRC : https://www.tradingview.com/charting-library-docs/latest/connecting_data/UDF#api-calls
To configure the data that to be recieved and sent to the apis of trading view chart: 
  Request: GET /config
  Response: The library expects to receive a JSON response of the same structure as a result of Datafeed API onReady() call.

//Need data from BE

/*
{
        name: 'AAPL', // Symbol of the stock provided by app
        'exchange-traded': 'NSE',
        'exchange-listed': 'NSE', // Responsible for showing stock exchange.
        timezone: 'America/New_York', // Responsible for setting the timezone 
        minmov: 1,
        minmov2: 0,
        pointvalue: 1,
        session: '0930-1630',
        has_intraday: false,
        visible_plots_set: 'ohlcv', // Responsible for showing numeric values above legend in the chart
        description: 'Apple Inclusives Ltd.', // Shows full name of the stock
        type: 'stock',
        supported_resolutions: ['D', '2D', '3D', 'W', '3W', 'M', '6M'],
        pricescale: 100, // Responsible for showing the chart if provided 0 value will not show ticks neither price scale
        ticker: symbol,
        logo_urls: ['https://s3-symbol-logo.tradingview.com/apple.svg'], // Stock image
        exchange_logo: 'https://s3-symbol-logo.tradingview.com/country/US.svg', // Exchange image.
    };
 */




// App -------{symbol}-------> Webview ---------{Hit BE Api}-----------> BE-Response ----------{Hit TV Api}----------> TV Response --------->{Display Chart}

// https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/