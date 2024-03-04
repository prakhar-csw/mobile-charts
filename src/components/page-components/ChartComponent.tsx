'use client';
import {useEffect} from 'react';
import { getParameterByName, initOnReady } from '@/app/utils/utilityFunctions1';
// import { ChartingLibraryWidgetOptions, ResolutionString, widget } from "../../../public/charting_library";


const ChartComponent = () => {
    useEffect(()=>{
      //<----------------- Code written as per suggestion from docs. ------------------>
      // const widgetOptions: ChartingLibraryWidgetOptions = {
      //   fullscreen: false,
      //   symbol: 'AAPL',
      //   interval: '1D' as ResolutionString,
      //   container: "tv_chart_container",
      //   autosize:true,
      //   datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(
      //       "https://demo_feed.tradingview.com",
      //       undefined,
      //       {
      //           maxResponseLength: 1000,
      //           expectedOrder: "latestFirst",
      //       }
      //   ),
      //   library_path: "charting_library/",
      //   locale: getParameterByName('lang') || "en" as any,
  
      //   disabled_features: ["use_localstorage_for_settings"],
      //   enabled_features: ["study_templates"],
      //   charts_storage_url: 'https://saveload.tradingview.com',
      //   charts_storage_api_version: "1.1",
      //   client_id: 'tradingview.com',
      //   user_id: 'public_user_id',
      //   theme: getParameterByName('theme') as any,
      // };
  
      // const tvWidget = new widget(widgetOptions);

      // const initOnReady = (datafeedUrl:string) : void => {
      //   var customDataUrl = getParameterByName('dataUrl');
      //   if (customDataUrl !== "") {
      //       datafeedUrl = customDataUrl.startsWith('https://') ? customDataUrl : `https://${customDataUrl}`;
      //   }
      //   tvWidget.onChartReady(() => {
      //       tvWidget.headerReady().then(() => {
      //           const button = tvWidget.createButton();
      //           button.setAttribute("title", "Click to show a notification popup");
      //           button.classList.add("apply-common-tooltip");
      //           button.addEventListener("click", () =>
      //               tvWidget.showNoticeDialog({
      //                   title: "Notification",
      //                   body: "TradingView Charting Library API works correctly",
      //                   callback: () => {
      //                       console.log("Noticed!");
      //                   },
      //               })
      //           );
    
      //           button.innerHTML = "Check API";
      //       });
      //   });
      //   window.frames[0].focus();
      // };

      // initOnReady('https://demo-feed-data.tradingview.com');

      // return () => {
      //   tvWidget.remove();
      // };
      initOnReady('https://demo-feed-data.tradingview.com');
      setIsChartReady(true);
    },[])
  return (
    <section className='flex-grow'>
      <div id="tv_chart_container" className='h-full'/>
    </section>
  )
}

export default ChartComponent;