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

  return (
    <ChartContext.Provider value={undefined}>
      <ChartHOC dataFeedUrl={props.dataFeedUrl} assetSymbol={assetSymbol}/>
    </ChartContext.Provider>
  )
};

export default ChartUI;