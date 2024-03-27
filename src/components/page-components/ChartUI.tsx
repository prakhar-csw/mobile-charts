"use client";
import React, { useState, useEffect } from "react";
import ChartHOC from "./ChartHOC";
import { ChartContext } from "@/app/utils/context/ChartContext";

import { DUMMY_SYMBOL } from "@/app/utils/constants";
import ButtonContainer from "./ButtonContainer";

// Prodiver
const ChartUI = (props: any) => {
  const [assetSymbol, setAssetSymbol] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [dataRecieved, setDataRecieved] = useState<any>({});

  useEffect(() => {
    window.addEventListener("message", (event) => {
      console.log("data recieved : ", event.data);
      setDataRecieved(event.data);
      
      const symbol = event?.data?.symObj?.symbol;
      const theme = event?.data?.symObj?.theme;

      setAssetSymbol(symbol);
      setTheme(theme);
    });

    // setAssetSymbol('BANDHANBNK');
  }, []);

  return (
    <ChartContext.Provider value={undefined}>
      <ChartHOC assetSymbol={assetSymbol} theme={theme}/>
    </ChartContext.Provider>
  );
};

export default ChartUI;
