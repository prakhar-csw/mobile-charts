// import { createContext, ReactNode, useContext, useState } from 'react';

// interface ChartContextProps {
//   assetSymbol: string;
//   setAssetSymbol: (value: string) => void;
// }

// const ChartContext = createContext<ChartContextProps | undefined>(undefined);

// interface ChartProviderProps {
//   children: ReactNode;
// }

// export const ChartProvider: React.FC<ChartProviderProps> = ({ children }) => {
//   const [assetSymbol, setAssetSymbol] = useState<string>('light');

//   const contextValue: ChartContextProps = {
//     assetSymbol,
//     setAssetSymbol,
//   };

//   return <ChartContext.Provider value={contextValue}>{children}</ChartContext.Provider>;
// };

// export const useChart = (): ChartContextProps => {
//   const context = useContext(ChartContext);

//   if (!context) {
//     throw new Error('useChart must be used within a ThemeProvider');
//   }

//   return context;
// };

import { createContext } from 'react';

interface ChartContextProps {
  assetSymbol: string;
  setAssetSymbol: (value: string) => void;
}

export const ChartContext = createContext<ChartContextProps | undefined>({
  assetSymbol: '',
  setAssetSymbol: function (value){
    this.assetSymbol = value
  }
});

