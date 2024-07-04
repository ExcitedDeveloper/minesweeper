import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useRef,
  MutableRefObject,
} from 'react'
import { BoardType, GameType, FaceClass, GameStatus } from './types/Game'
import { createBoard } from './util/board'
import {
  BEGINNER_HEIGHT,
  BEGINNER_MINES,
  BEGINNER_WIDTH,
  INTERVAL_TIME,
  MAX_TIME,
  MIN_TIME,
} from './constants'

export type GameContextType = {
  gameType: [GameType, React.Dispatch<React.SetStateAction<GameType>>]
  height: [number, React.Dispatch<React.SetStateAction<number>>]
  width: [number, React.Dispatch<React.SetStateAction<number>>]
  mines: [number, React.Dispatch<React.SetStateAction<number>>]
  marks: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  remainingMines: [number, React.Dispatch<React.SetStateAction<number>>]
  board: [BoardType, React.Dispatch<React.SetStateAction<BoardType>>]
  faceClass: [string, React.Dispatch<React.SetStateAction<FaceClass>>]
  gameStatus: [GameStatus, React.Dispatch<React.SetStateAction<GameStatus>>]
  timer: [
    number,
    React.Dispatch<React.SetStateAction<number>>,
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ]
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

  const defaultBoard = createBoard(
    BEGINNER_WIDTH,
    BEGINNER_HEIGHT,
    BEGINNER_MINES
  )
  const [board, setBoard] = useState(defaultBoard)

  const [faceClass, setFaceClass] = useState(FaceClass.FaceSmile)

  const [gameStatus, setGameStatus] = useState(GameStatus.NewGame)

  const [currentTime, setCurrentTime] = useState(MIN_TIME)

  const [isTimerRunning, setIsTimerRunning] = useState(false)

  const interval: MutableRefObject<number> | undefined = useRef(0)

  useEffect(() => {
    if (isTimerRunning) {
      interval.current = setInterval(() => {
        setCurrentTime((prevTime) => {
          let newTime = prevTime + 1

          if (newTime >= MAX_TIME) {
            newTime = MAX_TIME
            setIsTimerRunning(false)
            clearInterval(interval.current)
          }

          return newTime
        })
      }, INTERVAL_TIME)
    } else {
      setIsTimerRunning(false)
      clearInterval(interval.current)
    }
    return () => {
      // TODO : Delete?
      // console.log(`setIsTimerRunning false 3`)
      // setIsTimerRunning(false)
      // clearInterval(interval.current)
    }
  }, [isTimerRunning])

  const store: GameContextType = {
    gameType: [gameType, setGameType],
    height: [height, setHeight],
    width: [width, setWidth],
    mines: [mines, setMines],
    marks: [marks, setMarks],
    remainingMines: [remainingMines, setRemainingMines],
    board: [board, setBoard],
    faceClass: [faceClass, setFaceClass],
    gameStatus: [gameStatus, setGameStatus],
    timer: [currentTime, setCurrentTime, isTimerRunning, setIsTimerRunning],
  }

  return <GameContext.Provider value={store}>{children}</GameContext.Provider>
}
