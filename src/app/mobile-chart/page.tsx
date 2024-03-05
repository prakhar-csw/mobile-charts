import Script from 'next/script';
import ChartUI from '@/components/page-components/ChartUI';

const page = () => {
  return (
    <main className='h-full flex flex-col'>
      <Script strategy="beforeInteractive" src="datafeeds/udf/dist/bundle.js" />
      <ChartUI dataFeedUrl="https://demo-feed-data.tradingview.com" marketUpColor="" marketDownColor="" />
	  </main>
  )
}

export default page;