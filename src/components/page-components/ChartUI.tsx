'use client';
import { createChartModule } from "@/app/utils/chartFunction";
import ChartContext from "@/app/utils/context/ChartContext";
import React, { useEffect } from "react";

interface ChartHOCProps {
  dataFeedUrl: string,
};

// HOC
const ChartHOC: React.FC<ChartHOCProps> = (props) => {
  const chart = createChartModule();
  
  useEffect(()=>{
    chart.init(props.dataFeedUrl);
    chart.dataFeed();

    return ()=>{
      chart.remove();
    }
  },[])

  return chart.renderUI();
}


// Prodiver
const ChartUI = (props: any) => {
  return (
    <ChartContext.Provider value={{}}>
      <ChartHOC dataFeedUrl={props.dataFeedUrl}/>
    </ChartContext.Provider>
  )
}

export default ChartUI;