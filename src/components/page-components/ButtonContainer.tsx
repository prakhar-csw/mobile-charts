import React from 'react'
import { Button } from '../ui/button'

const ButtonContainer = () => {
  return (
    <section className='h-24 flex items-center justify-center gap-2.5 w-full'>
        <Button size={'xlg'} variant='primary'>Buy</Button>
        <Button variant={'outline'} size={'xlg'}>Sell</Button>
    </section>
  )
}

export default ButtonContainer