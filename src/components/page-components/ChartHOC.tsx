import { createChartModule } from "@/app/utils/TVutilities/chartFunction";
import React, { useEffect } from "react";


interface IChartHOCProps {
    assetSymbol: string,
    theme: string,
};

const ChartHOC: React.FC<IChartHOCProps> = (props) => {
    const chart = new (createChartModule as any)();

    useEffect(()=> {
        if(!props.assetSymbol)
            return;
    
        chart.init(props.assetSymbol, props.theme);
        chart.dataFeed();
        return ()=>{
            chart.remove();
        }
    },[props.assetSymbol]);

    const ChartCanvas2 = chart.renderUI();
    return ChartCanvas2;
};

export default ChartHOC;