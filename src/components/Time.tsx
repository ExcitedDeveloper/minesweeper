import { useEffect, useContext } from 'react'
import { GameContext } from '../GameContext'
import Counter from './Counter'

function Time() {
  const ctx = useContext(GameContext)
  const [, setIsTimerRunning] = ctx.isTimerRunning

  const [currentTime, timerHasStopped] = ctx.useTimer

  useEffect(() => {
    setIsTimerRunning(!timerHasStopped)
  }, [setIsTimerRunning, timerHasStopped])

  return <Counter currentValue={currentTime} containerClass='time__container' />
}

export default Time
