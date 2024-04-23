import Board from './Board'
import Header from './Header'
import './Game.css'

const Game = () => {
  return (
    <div className='game__container'>
      <Header />
      <Board />
    </div>
  )
}

export default Game
