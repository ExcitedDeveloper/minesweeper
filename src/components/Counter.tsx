import { memo, useMemo } from 'react'
import './Counter.css'

type CounterProps = {
  currentValue: number
  containerClass: string
}

const Counter = memo(({ currentValue, containerClass }: CounterProps) => {
  const { ones, tens, hundreds } = useMemo(() => {
    const str = currentValue.toString()
    const nums = str.split('')
    
    if (currentValue < 10 && nums.length > 0) {
      return { ones: currentValue, tens: 0, hundreds: 0 }
    } else if (currentValue < 100 && nums.length > 1) {
      return { ones: Number(nums[1]), tens: Number(nums[0]), hundreds: 0 }
    } else if (nums.length > 2) {
      return { ones: Number(nums[2]), tens: Number(nums[1]), hundreds: Number(nums[0]) }
    } else {
      return { ones: 0, tens: 0, hundreds: 0 }
    }
  }, [currentValue])

  return (
    <div className={`counter__container ${containerClass}`}>
      <div className={`number number_${ones}`}></div>
      <div className={`number number_${tens}`}></div>
      <div className={`number number_${hundreds}`}></div>
    </div>
  )
})

export default Counter
