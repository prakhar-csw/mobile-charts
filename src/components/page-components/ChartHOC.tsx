import { createChartModule, ChartModule } from "@/app/utils/chartFunction";
import React, { useEffect } from "react";


interface ChartHOCProps {
    assetSymbol: string,
    theme: string,
};
const ChartHOC: React.FC<ChartHOCProps> = (props) => {
    const chart = new (createChartModule as any)();

    useEffect(()=> {
        if(!props.assetSymbol)
            return;
    
        chart.init(props.assetSymbol);
        chart.dataFeed();
        return ()=>{
            chart.remove();
        }
    },[props.assetSymbol]);

    const ChartCanvas2 = chart.renderUI();
    return ChartCanvas2;
};

export default ChartHOC;