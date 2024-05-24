import { useContext } from 'react'
import { GameContext } from '../GameContext'
import Counter from './Counter'

function Mines() {
  const ctx = useContext(GameContext)
  const [remainingMines] = ctx.remainingMines

  return (
    <Counter currentValue={remainingMines} containerClass='mines__container' />
  )
}

export default Mines
