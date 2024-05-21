import { useState, useEffect, useContext } from 'react'
import './Time.css'
import { GameContext } from '../GameContext'

function Time() {
  const ctx = useContext(GameContext)
  const [, setIsTimerRunning] = ctx.isTimerRunning
  const [ones, setOnes] = useState(0)
  const [tens, setTens] = useState(0)
  const [hundreds, setHundreds] = useState(0)
  const [currentTime, timerHasStopped] = ctx.useTimer

  useEffect(() => {
    const str = currentTime.toString()
    const nums = str.split('')
    if (currentTime < 10 && nums.length > 0) {
      setOnes(currentTime)
      setTens(0)
      setHundreds(0)
    } else if (currentTime < 100 && nums.length > 1) {
      setOnes(Number(nums[1]))
      setTens(Number(nums[0]))
      setHundreds(0)
    } else if (nums.length > 2) {
      setOnes(Number(nums[2]))
      setTens(Number(nums[1]))
      setHundreds(Number(nums[0]))
    } else {
      setOnes(0)
      setTens(0)
      setHundreds(0)
    }
  }, [currentTime])

  // TODO : Can I just call setIsTimerRunning(!timerHasStopped)
  useEffect(() => {
    if (timerHasStopped) {
      setIsTimerRunning(false)
    }
  }, [setIsTimerRunning, timerHasStopped])

  return (
    <div className='time__container'>
      <div className={`number number_${ones}`}></div>
      <div className={`number number_${tens}`}></div>
      <div className={`number number_${hundreds}`}></div>
    </div>
  )
}

export default Time
