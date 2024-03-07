'use client';
import React, { useState, useEffect } from "react";
import ChartHOC from "./ChartHOC";
import { ChartContext } from "@/app/utils/context/ChartContext";

import { DUMMY_SYMBOL } from "@/app/utils/constants";

// Prodiver
const ChartUI = (props: any) => {
  const [ assetSymbol, setAssetSymbol ] = useState<string>('');

  useEffect(() => {

    // window.addEventListener("message", (event) => {
    //   console.log(`Received message: ${event.data}`);
    //   setAssetSymbol(event.data || 'TATAMOTOTRS'); 
    // });

    setAssetSymbol(DUMMY_SYMBOL);
  }, []);

  // useEffect(()=>{
  //   const fetchData = async (assetSymbol: string) => {
  //     try {
  //       const responseFromHistoryAPI = await fetch(`/api/history?symbol=${assetSymbol}`);
  //       const responseFromSymbolsAPI = await fetch(`/api/symbols?symbol=${assetSymbol}`);

  //       const result1 = await responseFromHistoryAPI.json();
  //       const result2 = await responseFromSymbolsAPI.json();

  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   if(assetSymbol)
  //     fetchData(assetSymbol);

  // },[assetSymbol])

  return (
    <ChartContext.Provider value={undefined}>
      <ChartHOC dataFeedUrl={props.dataFeedUrl} assetSymbol={assetSymbol}/>
    </ChartContext.Provider>
  )
};

export default ChartUI;