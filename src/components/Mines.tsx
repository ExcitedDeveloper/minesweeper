import { useContext, useEffect, useState } from 'react'
import './Mines.css'
import { GameContext } from '../GameContext'

function Mines() {
  const ctx = useContext(GameContext)
  const [ones, setOnes] = useState(0)
  const [tens, setTens] = useState(0)
  const [hundreds, setHundreds] = useState(0)

  useEffect(() => {
    if (!ctx) {
      setOnes(0)
      setTens(0)
      setHundreds(0)
      return
    }

    const [remainingMines] = ctx.remainingMines

    if (!remainingMines) {
      setOnes(0)
      setTens(0)
      setHundreds(0)
      return
    }

    const str = remainingMines.toString()
    const nums = str.split('')
    if (remainingMines < 10 && nums.length > 0) {
      setOnes(remainingMines)
      setTens(0)
      setHundreds(0)
    } else if (remainingMines < 100 && nums.length > 1) {
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
  }, [ctx, ctx?.remainingMines])

  return (
    <div className='mines__container'>
      <div className={`number number_${ones}`}></div>
      <div className={`number number_${tens}`}></div>
      <div className={`number number_${hundreds}`}></div>
    </div>
  )
}

export default Mines
