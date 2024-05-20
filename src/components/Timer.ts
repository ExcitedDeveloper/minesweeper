/* TODO : DELETE */
import { useContext, useState, useEffect } from 'react'
import { GameContext } from '../GameContext'
import { MIN_TIME } from '../constants'

type TimerProps = {
  startTimer?: boolean
  stopTimer?: boolean
}

const Timer = ({ startTimer, stopTimer }: TimerProps) => {
  const ctx = useContext(GameContext)

  useEffect(() => {
    if (!ctx || !startTimer) return

    const [, setIsTimerRunning] = ctx.isTimerRunning
    const [, setTime] = ctx.time

    setIsTimerRunning(true)
    setTime(MIN_TIME)
  }, [startTimer])

  useEffect(() => {
    if (!ctx || !stopTimer) return

    const [, setIsTimerRunning] = ctx.isTimerRunning
    const [, setTime] = ctx.time

    setIsTimerRunning(false)
    setTime(MIN_TIME)
  }, [stopTimer])

  useEffect(() => {
    if (!ctx) return

    const [isTimerRunning] = ctx.isTimerRunning

    if (isTimerRunning) {
      //
    }
  }, [])

  return <div>Timer</div>
}

export default Timer
