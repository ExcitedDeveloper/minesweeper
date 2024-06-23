import { useContext } from 'react'
import Counter from './Counter'
import { GameContext } from '../GameContext'

function Time() {
  const ctx = useContext(GameContext)
  const [currentTime] = ctx.timer

  return <Counter currentValue={currentTime} containerClass='time__container' />
}

export default Time
