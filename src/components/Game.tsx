// TODO : Delete all commented out code
// import { useEffect, useContext } from 'react'
import Board from './Board'
import Header from './Header'
import './Game.css'
// import { GameContext } from '../GameContext'
// import { MIN_TIME, MAX_TIME } from '../constants'

const Game = () => {
  // const ctx = useContext(GameContext)

  // useEffect(() => {
  //   const [time, setTime] = ctx.time

  //   if (time < MIN_TIME) {
  //     setTime(MIN_TIME)
  //   } else if (time > MAX_TIME) {
  //     setTime(MAX_TIME)
  //   }
  // }, [ctx])

  return (
    <div className='game__container'>
      <Header />
      <Board />
    </div>
  )
}

export default Game
