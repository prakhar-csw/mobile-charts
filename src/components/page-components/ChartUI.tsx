"use client";
import React, { useState, useEffect } from "react";
import ChartHOC from "./ChartHOC";
import { ChartContext } from "@/app/utils/context/ChartContext";
import { addCookie, removeCookie } from "@/app/utils/storageHelper";
import { IE_ACCESS_TOKEN, IE_APP_ID, IE_TRADE_PRICE_TYPE } from "@/app/utils/constants";

// Prodiver
const ChartUI = (props: any) => {
  const [assetSymbol, setAssetSymbol] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [dataRecieved, setDataRecieved] = useState<any>({});

  useEffect(() => {
    window.addEventListener("message", (event : MessageEvent<any>) : void => {
      const dataRecievedFromApp = event.data?.params;

      const {symObj = {}, ieAppId = '', accessToken = '', theme = '', tradePriceType = 'DLTP'} = dataRecievedFromApp;

      setDataRecieved(dataRecievedFromApp);
      
      const symbol = symObj?.symbol;
      setAssetSymbol(symbol);
      setTheme(theme);

      addCookie(IE_APP_ID, ieAppId);
      addCookie(IE_ACCESS_TOKEN, accessToken);
      addCookie(IE_TRADE_PRICE_TYPE, tradePriceType);
    });
    // setAssetSymbol('TATAMOTORS');
    // addCookie(IE_ACCESS_TOKEN, 'some-random-token-value');
    // addCookie(IE_APP_ID, 'some-random-appid-value');
    // addCookie(IE_TRADE_PRICE_TYPE, 'LTP');
    return () => {
      removeCookie(IE_APP_ID);
      removeCookie(IE_ACCESS_TOKEN);
      removeCookie(IE_TRADE_PRICE_TYPE);
    }
  }, []);

  return (
    <ChartContext.Provider value={undefined}>
      <ChartHOC assetSymbol={assetSymbol} theme={theme}/>
    </ChartContext.Provider>
  );
};

export default ChartUI;
