import { memo } from 'react'
import Counter from './Counter'
import { useTimer } from '../hooks/useTimer'

const Time = memo(() => {
  const { currentTime } = useTimer()

  return <Counter currentValue={currentTime} containerClass='time__container' />
})

export default Time
