import { useCallback } from 'react'
import { useGameStore } from '../store/gameStore'
import { GameStatus, FaceClass } from '../types/Game'

export const useGameState = () => {
  const gameStatus = useGameStore((state) => state.gameStatus)
  const faceClass = useGameStore((state) => state.faceClass)
  const gameType = useGameStore((state) => state.gameType)
  const marks = useGameStore((state) => state.marks)
  const remainingMines = useGameStore((state) => state.remainingMines)
  
  const setGameStatus = useGameStore((state) => state.setGameStatus)
  const setFaceClass = useGameStore((state) => state.setFaceClass)
  const setGameType = useGameStore((state) => state.setGameType)
  const setMarks = useGameStore((state) => state.setMarks)
  const startTimer = useGameStore((state) => state.startTimer)
  const stopTimer = useGameStore((state) => state.stopTimer)
  const newGame = useGameStore((state) => state.newGame)

  const handleGameWon = useCallback(() => {
    setGameStatus(GameStatus.Won)
    setFaceClass(FaceClass.FaceWin)
    stopTimer()
  }, [setGameStatus, setFaceClass, stopTimer])

  const handleGameLost = useCallback(() => {
    setGameStatus(GameStatus.Lost)
    setFaceClass(FaceClass.FaceDead)
    stopTimer()
  }, [setGameStatus, setFaceClass, stopTimer])

  const handleGameStart = useCallback(() => {
    if (gameStatus === GameStatus.NewGame) {
      setGameStatus(GameStatus.Playing)
      startTimer()
    }
  }, [gameStatus, setGameStatus, startTimer])

  const handleNewGame = useCallback(() => {
    newGame()
  }, [newGame])

  return {
    // State
    gameStatus,
    faceClass,
    gameType,
    marks,
    remainingMines,
    
    // Actions
    setGameStatus,
    setFaceClass,
    setGameType,
    setMarks,
    handleGameWon,
    handleGameLost,
    handleGameStart,
    handleNewGame,
  }
}