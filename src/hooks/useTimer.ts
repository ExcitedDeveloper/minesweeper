import { useEffect, useContext, useState } from 'react'
import { GameContext } from '../GameContext'
import { MAX_TIME, MIN_TIME, INTERVAL_TIME } from '../constants'

const useTimer = (isTimerRunning: boolean) => {
  const ctx = useContext(GameContext)

  const [currentTime, setCurrentTime] = useState(MIN_TIME)
  const [timerHasStopped, setTimerHasStopped] = useState(true)

  useEffect(() => {
    let interval: number | undefined

    if (isTimerRunning) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          let newTime = prevTime + 1

          if (newTime >= MAX_TIME) {
            newTime = MAX_TIME
            setTimerHasStopped(true)
            clearInterval(interval)
          } else {
            setTimerHasStopped(false)
          }

          return newTime
        })
      }, INTERVAL_TIME)
    } else {
      setTimerHasStopped(true)
      clearInterval(interval)
    }
    return () => {
      setTimerHasStopped(true)
      clearInterval(interval)
    }
  }, [ctx, isTimerRunning])

  return { currentTime, setCurrentTime, timerHasStopped }
}

export default useTimer
