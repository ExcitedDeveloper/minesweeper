import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useGameState } from './useGameState'
import { useGameStore } from '../store/gameStore'
import { GameStatus, FaceClass, GameType } from '../types/Game'

describe('useGameState', () => {
  beforeEach(() => {
    useGameStore.getState().resetGame()
  })

  it('should return initial state values', () => {
    const { result } = renderHook(() => useGameState())
    
    expect(result.current.gameStatus).toBe(GameStatus.NewGame)
    expect(result.current.faceClass).toBe(FaceClass.FaceSmile)
    expect(result.current.gameType).toBe(GameType.Beginner)
    expect(result.current.marks).toBe(false)
    expect(result.current.remainingMines).toBe(10)
  })

  it('should provide setters for state values', () => {
    const { result } = renderHook(() => useGameState())
    
    act(() => {
      result.current.setGameStatus(GameStatus.Playing)
    })
    expect(result.current.gameStatus).toBe(GameStatus.Playing)
    
    act(() => {
      result.current.setFaceClass(FaceClass.FacePressed)
    })
    expect(result.current.faceClass).toBe(FaceClass.FacePressed)
    
    act(() => {
      result.current.setGameType(GameType.Expert)
    })
    expect(result.current.gameType).toBe(GameType.Expert)
    
    act(() => {
      result.current.setMarks(true)
    })
    expect(result.current.marks).toBe(true)
  })

  it('should handle game won correctly', () => {
    const { result } = renderHook(() => useGameState())
    
    act(() => {
      result.current.handleGameWon()
    })
    
    expect(result.current.gameStatus).toBe(GameStatus.Won)
    expect(result.current.faceClass).toBe(FaceClass.FaceWin)
    expect(useGameStore.getState().isTimerRunning).toBe(false)
  })

  it('should handle game lost correctly', () => {
    const { result } = renderHook(() => useGameState())
    
    act(() => {
      result.current.handleGameLost()
    })
    
    expect(result.current.gameStatus).toBe(GameStatus.Lost)
    expect(result.current.faceClass).toBe(FaceClass.FaceDead)
    expect(useGameStore.getState().isTimerRunning).toBe(false)
  })

  it('should handle game start when game is new', () => {
    const { result } = renderHook(() => useGameState())
    
    // Initially game should be new
    expect(result.current.gameStatus).toBe(GameStatus.NewGame)
    
    act(() => {
      result.current.handleGameStart()
    })
    
    expect(result.current.gameStatus).toBe(GameStatus.Playing)
    expect(useGameStore.getState().isTimerRunning).toBe(true)
  })

  it('should not start game if already playing', () => {
    const { result } = renderHook(() => useGameState())
    
    // Set game to playing first
    act(() => {
      result.current.setGameStatus(GameStatus.Playing)
    })
    
    // Store the current timer state
    const initialTimerState = useGameStore.getState().isTimerRunning
    
    act(() => {
      result.current.handleGameStart()
    })
    
    // Status should remain Playing, timer state unchanged
    expect(result.current.gameStatus).toBe(GameStatus.Playing)
    expect(useGameStore.getState().isTimerRunning).toBe(initialTimerState)
  })

  it('should handle new game', () => {
    const { result } = renderHook(() => useGameState())
    
    // Change some state first
    act(() => {
      result.current.setGameStatus(GameStatus.Playing)
      result.current.setFaceClass(FaceClass.FacePressed)
    })
    
    act(() => {
      result.current.handleNewGame()
    })
    
    // Should reset to new game state
    expect(result.current.gameStatus).toBe(GameStatus.NewGame)
    expect(result.current.faceClass).toBe(FaceClass.FaceSmile)
    expect(useGameStore.getState().currentTime).toBe(0)
    expect(useGameStore.getState().isTimerRunning).toBe(false)
  })

  it('should maintain callback references across re-renders', () => {
    const { result, rerender } = renderHook(() => useGameState())
    
    const initialCallbacks = {
      handleGameWon: result.current.handleGameWon,
      handleGameLost: result.current.handleGameLost,
      handleGameStart: result.current.handleGameStart,
      handleNewGame: result.current.handleNewGame,
    }
    
    rerender()
    
    expect(result.current.handleGameWon).toBe(initialCallbacks.handleGameWon)
    expect(result.current.handleGameLost).toBe(initialCallbacks.handleGameLost)
    expect(result.current.handleGameStart).toBe(initialCallbacks.handleGameStart)
    expect(result.current.handleNewGame).toBe(initialCallbacks.handleNewGame)
  })
})