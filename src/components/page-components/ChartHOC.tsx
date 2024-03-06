

import { createChartModule2, ChartModule } from "@/app/utils/chartFunction";
import { ChartContext } from "@/app/utils/context/ChartContext";
import React, { useContext, useEffect } from "react";


interface ChartHOCProps {
    dataFeedUrl: string,
    assetSymbol: string,
};

const ChartHOC: React.FC<ChartHOCProps> = (props) => {
    const chart = new (createChartModule2 as any);

    useEffect(()=> {
        if(!props.assetSymbol)
            return;
    
        chart.init(props.dataFeedUrl, props.assetSymbol);
        chart.dataFeed();
        return ()=>{
            chart.remove();
        }
    },[props.assetSymbol]);

    const ChartCanvas2 = chart.renderUI();
    return ChartCanvas2;
};

export default ChartHOC;