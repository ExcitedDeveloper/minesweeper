import { ReactNode, createContext, useState } from 'react'
import { GameType } from './types/Game'

export type GameContextType = {
  gameType: [GameType, React.Dispatch<React.SetStateAction<GameType>>]
  height: [number, React.Dispatch<React.SetStateAction<number>>]
  width: [number, React.Dispatch<React.SetStateAction<number>>]
  mines: [number, React.Dispatch<React.SetStateAction<number>>]
  marks: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

export const GameContext = createContext<GameContextType | null>(null)

type GameProviderProps = { children: ReactNode }

export const GameProvider = ({ children }: GameProviderProps) => {
  const [gameType, setGameType] = useState(GameType.Beginner)
  const [height, setHeight] = useState(9)
  const [width, setWidth] = useState(9)
  const [mines, setMines] = useState(10)
  const [marks, setMarks] = useState(false)

  const store: GameContextType = {
    gameType: [gameType, setGameType],
    height: [height, setHeight],
    width: [width, setWidth],
    mines: [mines, setMines],
    marks: [marks, setMarks],
  }

  return <GameContext.Provider value={store}>{children}</GameContext.Provider>
}