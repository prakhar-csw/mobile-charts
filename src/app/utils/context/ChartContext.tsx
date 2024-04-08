import { createContext } from 'react';

interface IChartContextProps {
  assetSymbol: string;
  setAssetSymbol: (value: string) => void;
}

export const ChartContext = createContext<IChartContextProps | undefined>({
  assetSymbol: '',
  setAssetSymbol: function (value){
    this.assetSymbol = value
  }
});

