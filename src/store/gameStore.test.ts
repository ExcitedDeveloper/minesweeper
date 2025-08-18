import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useGameStore } from './gameStore'
import { GameType, GameStatus, FaceClass, CellType } from '../types/Game'
import { BEGINNER_HEIGHT, BEGINNER_WIDTH, BEGINNER_MINES, MIN_TIME, MAX_TIME } from '../constants'

describe('gameStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useGameStore.getState().resetGame()
    vi.clearAllTimers()
  })

  describe('initial state', () => {
    it('should have correct initial values', () => {
      const state = useGameStore.getState()
      
      expect(state.gameType).toBe(GameType.Beginner)
      expect(state.height).toBe(BEGINNER_HEIGHT)
      expect(state.width).toBe(BEGINNER_WIDTH)
      expect(state.mines).toBe(BEGINNER_MINES)
      expect(state.marks).toBe(false)
      expect(state.gameStatus).toBe(GameStatus.NewGame)
      expect(state.faceClass).toBe(FaceClass.FaceSmile)
      expect(state.remainingMines).toBe(BEGINNER_MINES)
      expect(state.currentTime).toBe(MIN_TIME)
      expect(state.isTimerRunning).toBe(false)
      expect(state.timerId).toBe(0)
    })

    it('should have a valid board', () => {
      const state = useGameStore.getState()
      
      expect(state.board).toHaveLength(BEGINNER_HEIGHT)
      expect(state.board[0]).toHaveLength(BEGINNER_WIDTH)
      
      // Count mines on the board
      let mineCount = 0
      for (let row = 0; row < BEGINNER_HEIGHT; row++) {
        for (let col = 0; col < BEGINNER_WIDTH; col++) {
          if (state.board[row][col].type === CellType.Bomb) {
            mineCount++
          }
          expect(state.board[row][col].isRevealed).toBe(false)
        }
      }
      expect(mineCount).toBe(BEGINNER_MINES)
    })
  })

  describe('setGameType', () => {
    it('should update game type', () => {
      const { setGameType } = useGameStore.getState()
      
      setGameType(GameType.Intermediate)
      expect(useGameStore.getState().gameType).toBe(GameType.Intermediate)
      
      setGameType(GameType.Expert)
      expect(useGameStore.getState().gameType).toBe(GameType.Expert)
      
      setGameType(GameType.Custom)
      expect(useGameStore.getState().gameType).toBe(GameType.Custom)
    })
  })

  describe('setDimensions', () => {
    it('should update dimensions and remaining mines', () => {
      const { setDimensions } = useGameStore.getState()
      
      setDimensions(20, 15, 50)
      const state = useGameStore.getState()
      
      expect(state.width).toBe(20)
      expect(state.height).toBe(15)
      expect(state.mines).toBe(50)
      expect(state.remainingMines).toBe(50)
    })
  })

  describe('setMarks', () => {
    it('should update marks setting', () => {
      const { setMarks } = useGameStore.getState()
      
      setMarks(true)
      expect(useGameStore.getState().marks).toBe(true)
      
      setMarks(false)
      expect(useGameStore.getState().marks).toBe(false)
    })
  })

  describe('setBoard', () => {
    it('should update the board', () => {
      const { setBoard } = useGameStore.getState()
      const newBoard = [[{
        type: CellType.One,
        isRevealed: true,
        revealClass: 'open1'
      }]]
      
      setBoard(newBoard)
      expect(useGameStore.getState().board).toBe(newBoard)
    })
  })

  describe('setGameStatus', () => {
    it('should update game status', () => {
      const { setGameStatus } = useGameStore.getState()
      
      setGameStatus(GameStatus.InProgress)
      expect(useGameStore.getState().gameStatus).toBe(GameStatus.InProgress)
      
      setGameStatus(GameStatus.Won)
      expect(useGameStore.getState().gameStatus).toBe(GameStatus.Won)
      
      setGameStatus(GameStatus.Lost)
      expect(useGameStore.getState().gameStatus).toBe(GameStatus.Lost)
    })
  })

  describe('setFaceClass', () => {
    it('should update face class', () => {
      const { setFaceClass } = useGameStore.getState()
      
      setFaceClass(FaceClass.FacePressed)
      expect(useGameStore.getState().faceClass).toBe(FaceClass.FacePressed)
      
      setFaceClass(FaceClass.FaceWon)
      expect(useGameStore.getState().faceClass).toBe(FaceClass.FaceWon)
      
      setFaceClass(FaceClass.FaceLost)
      expect(useGameStore.getState().faceClass).toBe(FaceClass.FaceLost)
    })
  })

  describe('mine count management', () => {
    it('should set remaining mines', () => {
      const { setRemainingMines } = useGameStore.getState()
      
      setRemainingMines(5)
      expect(useGameStore.getState().remainingMines).toBe(5)
      
      setRemainingMines(0)
      expect(useGameStore.getState().remainingMines).toBe(0)
    })

    it('should update remaining mines with delta', () => {
      const { updateRemainingMines, setRemainingMines } = useGameStore.getState()
      
      setRemainingMines(10)
      updateRemainingMines(-1)
      expect(useGameStore.getState().remainingMines).toBe(9)
      
      updateRemainingMines(2)
      expect(useGameStore.getState().remainingMines).toBe(11)
      
      updateRemainingMines(-5)
      expect(useGameStore.getState().remainingMines).toBe(6)
    })
  })

  describe('timer management', () => {
    it('should start timer', () => {
      const { startTimer } = useGameStore.getState()
      
      startTimer()
      expect(useGameStore.getState().isTimerRunning).toBe(true)
    })

    it('should not start timer if already running', () => {
      const { startTimer } = useGameStore.getState()
      
      startTimer()
      const firstCall = useGameStore.getState().isTimerRunning
      
      startTimer()
      expect(useGameStore.getState().isTimerRunning).toBe(firstCall)
    })

    it('should stop timer', () => {
      const { startTimer, stopTimer } = useGameStore.getState()
      
      startTimer()
      stopTimer()
      
      const state = useGameStore.getState()
      expect(state.isTimerRunning).toBe(false)
      expect(state.timerId).toBe(0)
    })

    it('should reset timer', () => {
      const { startTimer, resetTimer, setCurrentTime } = useGameStore.getState()
      
      startTimer()
      setCurrentTime(30)
      resetTimer()
      
      const state = useGameStore.getState()
      expect(state.currentTime).toBe(MIN_TIME)
      expect(state.isTimerRunning).toBe(false)
      expect(state.timerId).toBe(0)
    })

    it('should set current time with max limit', () => {
      const { setCurrentTime } = useGameStore.getState()
      
      setCurrentTime(100)
      expect(useGameStore.getState().currentTime).toBe(100)
      
      setCurrentTime(MAX_TIME + 100)
      expect(useGameStore.getState().currentTime).toBe(MAX_TIME)
      
      setCurrentTime(0)
      expect(useGameStore.getState().currentTime).toBe(0)
    })
  })

  describe('game actions', () => {
    it('should create new game with current settings', () => {
      const { newGame, setDimensions, setCurrentTime, setGameStatus } = useGameStore.getState()
      
      // Change some settings
      setDimensions(10, 10, 15)
      setCurrentTime(50)
      setGameStatus(GameStatus.InProgress)
      
      newGame()
      
      const state = useGameStore.getState()
      expect(state.width).toBe(10) // Settings preserved
      expect(state.height).toBe(10)
      expect(state.mines).toBe(15)
      expect(state.remainingMines).toBe(15)
      expect(state.currentTime).toBe(MIN_TIME) // Reset
      expect(state.gameStatus).toBe(GameStatus.NewGame) // Reset
      expect(state.faceClass).toBe(FaceClass.FaceSmile) // Reset
      expect(state.isTimerRunning).toBe(false) // Reset
      expect(state.timerId).toBe(0) // Reset
      
      // Board should be regenerated
      let mineCount = 0
      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
          if (state.board[row][col].type === CellType.Bomb) {
            mineCount++
          }
          expect(state.board[row][col].isRevealed).toBe(false)
        }
      }
      expect(mineCount).toBe(15)
    })

    it('should reset game to beginner defaults', () => {
      const { resetGame, setDimensions, setGameType, setMarks } = useGameStore.getState()
      
      // Change all settings
      setGameType(GameType.Expert)
      setDimensions(30, 20, 100)
      setMarks(true)
      
      resetGame()
      
      const state = useGameStore.getState()
      expect(state.gameType).toBe(GameType.Beginner)
      expect(state.height).toBe(BEGINNER_HEIGHT)
      expect(state.width).toBe(BEGINNER_WIDTH)
      expect(state.mines).toBe(BEGINNER_MINES)
      expect(state.marks).toBe(false)
      expect(state.gameStatus).toBe(GameStatus.NewGame)
      expect(state.faceClass).toBe(FaceClass.FaceSmile)
      expect(state.remainingMines).toBe(BEGINNER_MINES)
      expect(state.currentTime).toBe(MIN_TIME)
      expect(state.isTimerRunning).toBe(false)
      expect(state.timerId).toBe(0)
      
      // Board should be reset to beginner size
      expect(state.board).toHaveLength(BEGINNER_HEIGHT)
      expect(state.board[0]).toHaveLength(BEGINNER_WIDTH)
    })
  })

  describe('timer with actual intervals', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should clear interval when stopping timer with active timer id', () => {
      const { stopTimer } = useGameStore.getState()
      
      // Manually set a timer ID to simulate active timer
      useGameStore.setState({ timerId: 123, isTimerRunning: true })
      
      const clearIntervalSpy = vi.spyOn(global, 'clearInterval')
      
      stopTimer()
      
      expect(clearIntervalSpy).toHaveBeenCalledWith(123)
      expect(useGameStore.getState().timerId).toBe(0)
      expect(useGameStore.getState().isTimerRunning).toBe(false)
    })

    it('should clear interval when resetting timer with active timer id', () => {
      const { resetTimer } = useGameStore.getState()
      
      // Manually set a timer ID to simulate active timer
      useGameStore.setState({ timerId: 456, currentTime: 30 })
      
      const clearIntervalSpy = vi.spyOn(global, 'clearInterval')
      
      resetTimer()
      
      expect(clearIntervalSpy).toHaveBeenCalledWith(456)
      expect(useGameStore.getState().timerId).toBe(0)
      expect(useGameStore.getState().currentTime).toBe(MIN_TIME)
    })
  })
})