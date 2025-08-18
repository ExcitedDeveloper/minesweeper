import { memo } from 'react'
import { useGameStore } from '../store/gameStore'
import Counter from './Counter'

const Mines = memo(() => {
  const remainingMines = useGameStore((state) => state.remainingMines)

  return (
    <Counter currentValue={remainingMines} containerClass='mines__container' />
  )
})

export default Mines
