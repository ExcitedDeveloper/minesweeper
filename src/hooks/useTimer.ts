import { useEffect, useRef } from 'react'
import { useGameStore } from '../store/gameStore'
import { INTERVAL_TIME, MAX_TIME } from '../constants'

export const useTimer = () => {
  const intervalRef = useRef<number>(0)
  const currentTime = useGameStore((state) => state.currentTime)
  const isTimerRunning = useGameStore((state) => state.isTimerRunning)
  const setCurrentTime = useGameStore((state) => state.setCurrentTime)
  const stopTimer = useGameStore((state) => state.stopTimer)

  useEffect(() => {
    if (isTimerRunning) {
      intervalRef.current = window.setInterval(() => {
        setCurrentTime(currentTime + 1)
        if (currentTime >= MAX_TIME - 1) {
          stopTimer()
        }
      }, INTERVAL_TIME)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = 0
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isTimerRunning, currentTime, setCurrentTime, stopTimer])

  return {
    currentTime,
    isTimerRunning,
  }
}