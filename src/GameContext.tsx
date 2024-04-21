import { ReactNode, createContext, useState } from 'react'
import { GameType } from './components/Game'

export const GameContext = createContext<
  | { gameType: any[]; height: any[]; width: any[]; mines: any[]; marks: any[] }
  | undefined
>(undefined)

type GameProviderProps = { children: ReactNode }

export const GameProvider = ({ children }: GameProviderProps) => {
  const [gameType, setGameType] = useState(GameType.Beginner)
  const [height, setHeight] = useState(9)
  const [width, setWidth] = useState(9)
  const [mines, setMines] = useState(10)
  const [marks, setMarks] = useState(false)

  const store = {
    gameType: [gameType, setGameType],
    height: [height, setHeight],
    width: [width, setWidth],
    mines: [mines, setMines],
    marks: [marks, setMarks],
  }

  return <GameContext.Provider value={store}>{children}</GameContext.Provider>
}
