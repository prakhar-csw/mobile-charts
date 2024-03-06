import Script from 'next/script';
import ChartUI from '@/components/page-components/ChartUI';

const page = () => {
  const dataFeedUrl = 'http://localhost:3000/api';
  // const dataFeedUrl = "https://demo-feed-data.tradingview.com";
  return (
    <main className='h-full flex flex-col'>
      <Script strategy="beforeInteractive" src="datafeeds/udf/dist/bundle.js" />
      <ChartUI dataFeedUrl={dataFeedUrl} marketUpColor="" marketDownColor="" />
	  </main>
  )
}

export default page;