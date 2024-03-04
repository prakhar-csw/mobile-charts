import ButtonContainer from '@/components/page-components/ButtonContainer';
import ChartComponent from '@/components/page-components/ChartComponent';

const page = () => {
  return (
    <main className='h-full flex flex-col'>
        <ChartComponent/>
        <ButtonContainer/>
	</main>
  )
}

export default page