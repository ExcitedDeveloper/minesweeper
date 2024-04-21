import Board from './Board'
import Header from './Header'
import './Game.css'

// eslint-disable-next-line react-refresh/only-export-components
export enum GameType {
  Beginner = 'beginner',
  Intermediate = 'intermediate',
  Expert = 'expert',
  Custom = 'custom',
}

export type BoardData = {
  gameType: GameType
  height: number
  width: number
  mines: number
  marks: boolean
}

const Game = () => {
  return (
    <div className='game__container'>
      <Header />
      <Board />
    </div>
  )
}

export default Game
