// Datafeed implementation that you will add later
import Datafeed from './datafeed.js';
import { widget } from "../../../../public/charting_library/";



export const initOnReadyMock = () =>{
    window.tvWidget = new widget({
        symbol: 'Bitfinex:BTC/USD',            // Default symbol pair
        interval: '1D',                        // Default interval
        fullscreen: true,                      // Displays the chart in the fullscreen mode
        container: 'tv_chart_container',       // Reference to the attribute of the DOM element
        datafeed: Datafeed,
        library_path: '../../../../public/charting_library',
    });

    tvWidget.onChartReady(function () {});
    window.frames[0].focus();
};


export const removeWhenExit = () => {
    if (window.tvWidget) window.tvWidget.remove();
  };
  