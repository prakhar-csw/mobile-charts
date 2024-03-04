import ButtonContainer from '@/components/page-components/ButtonContainer';
import dynamic from 'next/dynamic';
import Script from 'next/script';

const ChartComponent = dynamic(() => import('@/components/page-components/ChartComponent'), {
  ssr: true,
})

const page = () => {
  return (
    <main className='h-full flex flex-col'>
      <Script strategy="beforeInteractive" src="datafeeds/udf/dist/bundle.js" />
      <ChartComponent/>
      <ButtonContainer/>
	  </main>
  )
}

export default page;