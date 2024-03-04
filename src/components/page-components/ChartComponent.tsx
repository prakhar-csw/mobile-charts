'use client';
import {useEffect} from 'react';
import { initOnReady } from '@/app/utils/utilityFunctions';


const ChartComponent = () => {
    useEffect(()=>{
        initOnReady('https://demo-feed-data.tradingview.com');
    },[])
  return (
    <section className='flex-grow'>
        <div id="tv_chart_container" className='h-full'></div>
    </section>
  )
}

export default ChartComponent;