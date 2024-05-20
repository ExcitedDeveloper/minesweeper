import { useEffect, useContext, useState } from 'react'
import { GameContext } from '../GameContext'
import { MAX_TIME, MIN_TIME } from '../constants'

const useTimer = () => {
  const ctx = useContext(GameContext)
  const [time, setTime] = useState(MIN_TIME)

  useEffect(() => {
    console.log(`useEffect`)
    if (!ctx) return

    let interval: number | undefined
    const [isTimerRunning] = ctx.isTimerRunning

    if (isTimerRunning) {
      console.log(`timer is running`)
      interval = setInterval(() => {
        setTime((prevTime) => {
          let newTime = prevTime + 1

          if (newTime >= MAX_TIME) {
            console.log(`max time`)
            newTime = MAX_TIME
            clearInterval(interval)
          }

          return newTime
        })
      }, 1000)
    } else {
      console.log(`timer is NOT running`)
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [ctx, ctx?.isTimerRunning])

  return time
}

export default useTimer
