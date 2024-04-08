"use client";
import React, { useState, useEffect } from "react";
import ChartHOC from "./ChartHOC";
import { ChartContext } from "@/app/utils/context/ChartContext";

// Prodiver
const ChartUI = (props: any) => {
  const [assetSymbol, setAssetSymbol] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [dataRecieved, setDataRecieved] = useState<any>({});

  useEffect(() => {
    // window.addEventListener("message", (event) => {
    //   console.log("data recieved : ", event.data);
    //   const dataRecievedFromApp = event.data?.data;

    //   setDataRecieved(dataRecievedFromApp);
      
    //   const symbol = dataRecievedFromApp.symObj?.symbol;
    //   const theme = dataRecievedFromApp?.theme;

    //   setAssetSymbol(symbol);
    //   setTheme(theme);
    // });
    setAssetSymbol('TATAMOTORS');
  }, []);

  return (
    <ChartContext.Provider value={undefined}>
      <ChartHOC assetSymbol={assetSymbol} theme={theme}/>
    </ChartContext.Provider>
  );
};

export default ChartUI;
