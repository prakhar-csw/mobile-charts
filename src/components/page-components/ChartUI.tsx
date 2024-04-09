"use client";
import React, { useState, useEffect } from "react";
import ChartHOC from "./ChartHOC";
import { ChartContext } from "@/app/utils/context/ChartContext";
import { addCookie, removeCookie } from "@/app/utils/storageHelper";
import { IE_ACCESS_TOKEN, IE_APP_ID } from "@/app/utils/constants";

// Prodiver
const ChartUI = (props: any) => {
  const [assetSymbol, setAssetSymbol] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [dataRecieved, setDataRecieved] = useState<any>({});

  useEffect(() => {
    window.addEventListener("message", (event : MessageEvent<any>) : void => {
      const dataRecievedFromApp = event.data?.params;

      const {symObj = {}, ieAppId = '', ieAccessToken = '', theme = ''} = dataRecievedFromApp;

      setDataRecieved(dataRecievedFromApp);
      
      const symbol = symObj?.symbol;
      setAssetSymbol(symbol);
      setTheme(theme);

      addCookie(IE_APP_ID, ieAppId);
      addCookie(IE_ACCESS_TOKEN, ieAccessToken);
    });
    // setAssetSymbol('TATAMOTORS');
    return () => {
      removeCookie('ieAppId');
      removeCookie('ieAccessToken');
    }
  }, []);

  return (
    <ChartContext.Provider value={undefined}>
      <ChartHOC assetSymbol={assetSymbol} theme={theme}/>
    </ChartContext.Provider>
  );
};

export default ChartUI;
