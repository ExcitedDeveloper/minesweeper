import { ReactNode, createContext, useState } from 'react'
import { BoardType, GameType } from './types/Game'
import useTimer from './hooks/useTimer'
import { createBoard } from './util/board'
import { BEGINNER_HEIGHT, BEGINNER_MINES, BEGINNER_WIDTH } from './constants'

export type GameContextType = {
  gameType: [GameType, React.Dispatch<React.SetStateAction<GameType>>]
  height: [number, React.Dispatch<React.SetStateAction<number>>]
  width: [number, React.Dispatch<React.SetStateAction<number>>]
  mines: [number, React.Dispatch<React.SetStateAction<number>>]
  marks: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  remainingMines: [number, React.Dispatch<React.SetStateAction<number>>]
  isTimerRunning: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  useTimer: [number, boolean, React.Dispatch<React.SetStateAction<number>>]
  board: [BoardType, React.Dispatch<React.SetStateAction<BoardType>>]
}

export const GameContext = createContext<GameContextType>({} as GameContextType)

type GameProviderProps = { children: ReactNode }

export const GameProvider = ({ children }: GameProviderProps) => {
  const [gameType, setGameType] = useState(GameType.Beginner)
  const [height, setHeight] = useState(BEGINNER_HEIGHT)
  const [width, setWidth] = useState(BEGINNER_WIDTH)
  const [mines, setMines] = useState(BEGINNER_MINES)
  const [marks, setMarks] = useState(false)
  const [remainingMines, setRemainingMines] = useState(BEGINNER_MINES)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const { currentTime, setCurrentTime, timerHasStopped } =
    useTimer(isTimerRunning)

  const defaultBoard = createBoard(
    BEGINNER_WIDTH,
    BEGINNER_HEIGHT,
    BEGINNER_MINES
  )
  const [board, setBoard] = useState(defaultBoard)

  const store: GameContextType = {
    gameType: [gameType, setGameType],
    height: [height, setHeight],
    width: [width, setWidth],
    mines: [mines, setMines],
    marks: [marks, setMarks],
    remainingMines: [remainingMines, setRemainingMines],
    isTimerRunning: [isTimerRunning, setIsTimerRunning],
    useTimer: [currentTime, timerHasStopped, setCurrentTime],
    board: [board, setBoard],
  }

  return <GameContext.Provider value={store}>{children}</GameContext.Provider>
}
