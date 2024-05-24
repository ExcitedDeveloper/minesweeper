import { useState, useEffect } from 'react'
import './Counter.css'

type CounterProps = {
  currentValue: number
  containerClass: string
}

function Counter({ currentValue, containerClass }: CounterProps) {
  const [ones, setOnes] = useState(0)
  const [tens, setTens] = useState(0)
  const [hundreds, setHundreds] = useState(0)

  useEffect(() => {
    const str = currentValue.toString()
    const nums = str.split('')
    if (currentValue < 10 && nums.length > 0) {
      setOnes(currentValue)
      setTens(0)
      setHundreds(0)
    } else if (currentValue < 100 && nums.length > 1) {
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
  }, [currentValue])

  return (
    <div className={`counter__container ${containerClass}`}>
      <div className={`number number_${ones}`}></div>
      <div className={`number number_${tens}`}></div>
      <div className={`number number_${hundreds}`}></div>
    </div>
  )
}

export default Counter
