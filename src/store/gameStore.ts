import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { BoardType, GameType, FaceClass, GameStatus } from '../types/Game'
import { createBoard } from '../util/board'
import {
  BEGINNER_HEIGHT,
  BEGINNER_MINES,
  BEGINNER_WIDTH,
  MIN_TIME,
  MAX_TIME,
} from '../constants'

interface GameState {
  // Game settings
  gameType: GameType
  height: number
  width: number
  mines: number
  marks: boolean

  // Game state
  board: BoardType
  gameStatus: GameStatus
  faceClass: FaceClass
  remainingMines: number

  // Timer state
  currentTime: number
  isTimerRunning: boolean
  timerId: number

  // Actions
  setGameType: (gameType: GameType) => void
  setDimensions: (width: number, height: number, mines: number) => void
  setMarks: (marks: boolean) => void
  setBoard: (board: BoardType) => void
  setGameStatus: (status: GameStatus) => void
  setFaceClass: (faceClass: FaceClass) => void
  setRemainingMines: (mines: number) => void
  updateRemainingMines: (delta: number) => void
  
  // Timer actions
  startTimer: () => void
  stopTimer: () => void
  resetTimer: () => void
  setCurrentTime: (time: number) => void

  // Game actions
  newGame: () => void
  resetGame: () => void
}

export const useGameStore = create<GameState>()(
  immer((set) => ({
    // Initial state
    gameType: GameType.Beginner,
    height: BEGINNER_HEIGHT,
    width: BEGINNER_WIDTH,
    mines: BEGINNER_MINES,
    marks: false,
    
    board: createBoard(BEGINNER_WIDTH, BEGINNER_HEIGHT, BEGINNER_MINES),
    gameStatus: GameStatus.NewGame,
    faceClass: FaceClass.FaceSmile,
    remainingMines: BEGINNER_MINES,
    
    currentTime: MIN_TIME,
    isTimerRunning: false,
    timerId: 0,

    // Basic setters
    setGameType: (gameType) => set((state) => {
      state.gameType = gameType
    }),

    setDimensions: (width, height, mines) => set((state) => {
      state.width = width
      state.height = height
      state.mines = mines
      state.remainingMines = mines
    }),

    setMarks: (marks) => set((state) => {
      state.marks = marks
    }),

    setBoard: (board) => set((state) => {
      state.board = board
    }),

    setGameStatus: (status) => set((state) => {
      state.gameStatus = status
    }),

    setFaceClass: (faceClass) => set((state) => {
      state.faceClass = faceClass
    }),

    setRemainingMines: (mines) => set((state) => {
      state.remainingMines = mines
    }),

    updateRemainingMines: (delta) => set((state) => {
      state.remainingMines += delta
    }),

    // Timer actions
    startTimer: () => set((state) => {
      if (!state.isTimerRunning) {
        state.isTimerRunning = true
        // Timer will be managed by a custom hook
      }
    }),

    stopTimer: () => set((state) => {
      state.isTimerRunning = false
      if (state.timerId) {
        clearInterval(state.timerId)
        state.timerId = 0
      }
    }),

    resetTimer: () => set((state) => {
      state.currentTime = MIN_TIME
      state.isTimerRunning = false
      if (state.timerId) {
        clearInterval(state.timerId)
        state.timerId = 0
      }
    }),

    setCurrentTime: (time) => set((state) => {
      state.currentTime = Math.min(time, MAX_TIME)
    }),

    // Game actions
    newGame: () => set((state) => {
      const { width, height, mines } = state
      state.board = createBoard(width, height, mines)
      state.gameStatus = GameStatus.NewGame
      state.faceClass = FaceClass.FaceSmile
      state.remainingMines = mines
      state.currentTime = MIN_TIME
      state.isTimerRunning = false
      if (state.timerId) {
        clearInterval(state.timerId)
        state.timerId = 0
      }
    }),

    resetGame: () => set((state) => {
      state.gameType = GameType.Beginner
      state.height = BEGINNER_HEIGHT
      state.width = BEGINNER_WIDTH
      state.mines = BEGINNER_MINES
      state.marks = false
      state.board = createBoard(BEGINNER_WIDTH, BEGINNER_HEIGHT, BEGINNER_MINES)
      state.gameStatus = GameStatus.NewGame
      state.faceClass = FaceClass.FaceSmile
      state.remainingMines = BEGINNER_MINES
      state.currentTime = MIN_TIME
      state.isTimerRunning = false
      if (state.timerId) {
        clearInterval(state.timerId)
        state.timerId = 0
      }
    }),
  }))
)