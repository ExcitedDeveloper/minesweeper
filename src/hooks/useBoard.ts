import { useCallback } from 'react'
import { produce } from 'immer'
import { useGameStore } from '../store/gameStore'
import { BoardType, CellType } from '../types/Game'
import { GameEngine } from '../engine/GameEngine'
import { 
  revealMap, 
  BLANK, 
  BOMB_DEATH, 
  BOMB_FLAGGED, 
  NOT_REVEALED, 
  BOMB_REVEALED, 
  QUESTION 
} from '../util/board'

export const useBoard = () => {
  const board = useGameStore((state) => state.board)
  const height = useGameStore((state) => state.height)
  const width = useGameStore((state) => state.width)
  const marks = useGameStore((state) => state.marks)
  
  const setBoard = useGameStore((state) => state.setBoard)
  const updateRemainingMines = useGameStore((state) => state.updateRemainingMines)

  const revealCell = useCallback((
    newBoard: BoardType,
    currRow: number,
    currCol: number
  ) => {
    // Validate position using GameEngine
    if (!GameEngine.isValidPosition(currRow, currCol, height, width)) {
      return
    }

    // Skip if already revealed or flagged
    if (
      newBoard[currRow][currCol].isRevealed ||
      newBoard[currRow][currCol].revealClass === BOMB_FLAGGED.toLowerCase()
    ) {
      return
    }

    if (newBoard[currRow][currCol].type === CellType.Blank) {
      // Reveal blank cell and adjacent cells
      newBoard[currRow][currCol].isRevealed = true
      newBoard[currRow][currCol].revealClass = revealMap[NOT_REVEALED]

      // Reveal all adjacent cells recursively using GameEngine
      const adjacentPositions = GameEngine.getAdjacentPositions(currRow, currCol, height, width)
      adjacentPositions.forEach(([row, col]) => {
        revealCell(newBoard, row, col)
      })
    } else if (newBoard[currRow][currCol].type === CellType.Bomb) {
      // Reveal bomb (death)
      newBoard[currRow][currCol].isRevealed = true
      newBoard[currRow][currCol].revealClass = revealMap[BOMB_DEATH]
    } else {
      // Reveal numbered cell
      newBoard[currRow][currCol].isRevealed = true
      newBoard[currRow][currCol].revealClass = revealMap[newBoard[currRow][currCol].type]
    }
  }, [height, width])

  const showAllBombs = useCallback((bombRow: number, bombCol: number) => {
    const newBoard = produce(board, (draft) => {
      for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
          if (draft[row][col].type === CellType.Bomb) {
            draft[row][col].revealClass = 
              (row === bombRow && col === bombCol) 
                ? revealMap[BOMB_DEATH]
                : revealMap[BOMB_REVEALED]
          }
        }
      }
    })
    setBoard(newBoard)
  }, [board, height, width, setBoard])

  const revealAllCells = useCallback(() => {
    const newBoard = produce(board, (draft) => {
      for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
          draft[row][col].isRevealed = true
          switch (draft[row][col].type) {
            case CellType.Bomb:
              draft[row][col].revealClass = revealMap[BOMB_FLAGGED]
              break
            case CellType.Blank:
              draft[row][col].revealClass = revealMap[NOT_REVEALED]
              break
            default:
              draft[row][col].revealClass = revealMap[draft[row][col].type]
              break
          }
        }
      }
    })
    setBoard(newBoard)
  }, [board, height, width, setBoard])

  const isGameWon = useCallback((boardToCheck: BoardType): boolean => {
    return GameEngine.isGameWon(boardToCheck, height, width)
  }, [height, width])

  const handleCellClick = useCallback((row: number, col: number) => {
    if (board[row][col].type === CellType.Bomb) {
      showAllBombs(row, col)
      return { isGameLost: true, isGameWon: false }
    }

    const newBoard = produce(board, (draft) => {
      revealCell(draft, row, col)
    })
    
    setBoard(newBoard)
    
    const gameWon = isGameWon(newBoard)
    if (gameWon) {
      revealAllCells()
    }
    
    return { isGameLost: false, isGameWon: gameWon }
  }, [board, revealCell, setBoard, isGameWon, showAllBombs, revealAllCells])

  const handleCellRightClick = useCallback((row: number, col: number) => {
    const newBoard = produce(board, (draft) => {
      const cell = draft[row][col]
      
      if (cell.revealClass === BOMB_FLAGGED.toLowerCase()) {
        // Remove flag
        cell.revealClass = marks ? revealMap[QUESTION] : revealMap[BLANK]
        updateRemainingMines(1)
      } else if (cell.revealClass === QUESTION.toLowerCase()) {
        // Remove question mark
        cell.revealClass = revealMap[BLANK]
      } else {
        // Add flag
        cell.revealClass = revealMap[BOMB_FLAGGED]
        updateRemainingMines(-1)
      }
    })

    setBoard(newBoard)
    
    const gameWon = isGameWon(newBoard)
    if (gameWon) {
      revealAllCells()
    }
    
    return { isGameWon: gameWon }
  }, [board, marks, setBoard, updateRemainingMines, isGameWon, revealAllCells])

  return {
    board,
    height,
    width,
    handleCellClick,
    handleCellRightClick,
  }
}