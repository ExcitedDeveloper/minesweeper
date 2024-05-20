import { useState, useEffect } from 'react'
import './Time.css'
import useTimer from '../hooks/useTimer'

function Time() {
  const time = useTimer()
  const [ones, setOnes] = useState(0)
  const [tens, setTens] = useState(0)
  const [hundreds, setHundreds] = useState(0)

  useEffect(() => {
    const str = time.toString()
    const nums = str.split('')
    if (time < 10 && nums.length > 0) {
      setOnes(time)
      setTens(0)
      setHundreds(0)
    } else if (time < 100 && nums.length > 1) {
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
  }, [time])

  return (
    <div className='time__container'>
      <div className={`number number_${ones}`}></div>
      <div className={`number number_${tens}`}></div>
      <div className={`number number_${hundreds}`}></div>
    </div>
  )
}

export default Time
