import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useBoard } from './useBoard'
import { useGameStore } from '../store/gameStore'
import { CellType } from '../types/Game'
import { revealMap, BOMB_FLAGGED, QUESTION, BLANK } from '../util/board'

describe('useBoard', () => {
  beforeEach(() => {
    useGameStore.getState().resetGame()
  })

  it('should return initial board state', () => {
    const { result } = renderHook(() => useBoard())
    
    expect(result.current.board).toBeDefined()
    expect(result.current.height).toBe(9)
    expect(result.current.width).toBe(9)
    expect(result.current.handleCellClick).toBeDefined()
    expect(result.current.handleCellRightClick).toBeDefined()
  })

  describe('handleCellClick', () => {
    it('should reveal a bomb and return game lost', () => {
      const { result } = renderHook(() => useBoard())
      
      // Find a bomb cell
      let bombRow = -1
      let bombCol = -1
      const board = result.current.board
      
      for (let row = 0; row < result.current.height; row++) {
        for (let col = 0; col < result.current.width; col++) {
          if (board[row][col].type === CellType.Bomb) {
            bombRow = row
            bombCol = col
            break
          }
        }
        if (bombRow !== -1) break
      }
      
      expect(bombRow).not.toBe(-1)
      expect(bombCol).not.toBe(-1)
      
      let clickResult
      act(() => {
        clickResult = result.current.handleCellClick(bombRow, bombCol)
      })
      
      expect(clickResult).toEqual({ isGameLost: true, isGameWon: false })
    })

    it('should reveal a numbered cell and return no game end', () => {
      const { result } = renderHook(() => useBoard())
      
      // Find a numbered cell (not bomb or blank)
      let numberedRow = -1
      let numberedCol = -1
      const board = result.current.board
      
      for (let row = 0; row < result.current.height; row++) {
        for (let col = 0; col < result.current.width; col++) {
          const cellType = board[row][col].type
          if (cellType !== CellType.Bomb && cellType !== CellType.Blank) {
            numberedRow = row
            numberedCol = col
            break
          }
        }
        if (numberedRow !== -1) break
      }
      
      if (numberedRow !== -1 && numberedCol !== -1) {
        let clickResult
        act(() => {
          clickResult = result.current.handleCellClick(numberedRow, numberedCol)
        })
        
        expect(clickResult).toEqual({ isGameLost: false, isGameWon: false })
        
        // Check that the cell was revealed
        const updatedBoard = result.current.board
        expect(updatedBoard[numberedRow][numberedCol].isRevealed).toBe(true)
      }
    })

    it('should reveal blank cells recursively', () => {
      const { result } = renderHook(() => useBoard())
      
      // Find a blank cell
      let blankRow = -1
      let blankCol = -1
      const board = result.current.board
      
      for (let row = 0; row < result.current.height; row++) {
        for (let col = 0; col < result.current.width; col++) {
          if (board[row][col].type === CellType.Blank) {
            blankRow = row
            blankCol = col
            break
          }
        }
        if (blankRow !== -1) break
      }
      
      if (blankRow !== -1 && blankCol !== -1) {
        let clickResult
        act(() => {
          clickResult = result.current.handleCellClick(blankRow, blankCol)
        })
        
        expect(clickResult).toEqual({ isGameLost: false, isGameWon: false })
        
        // Check that the blank cell and potentially adjacent cells were revealed
        const updatedBoard = result.current.board
        expect(updatedBoard[blankRow][blankCol].isRevealed).toBe(true)
      }
    })

    it('should detect game won when all non-bomb cells are revealed', () => {
      const { result } = renderHook(() => useBoard())
      
      // Create a simple test board with controlled layout
      const testBoard = [
        [
          { type: CellType.One, isRevealed: false, revealClass: 'blank' },
          { type: CellType.Bomb, isRevealed: false, revealClass: 'blank' }
        ],
        [
          { type: CellType.Blank, isRevealed: false, revealClass: 'blank' },
          { type: CellType.One, isRevealed: false, revealClass: 'blank' }
        ]
      ]
      
      // Set custom board and dimensions
      act(() => {
        useGameStore.getState().setBoard(testBoard)
        useGameStore.getState().setDimensions(2, 2, 1)
      })
      
      // Reveal all non-bomb cells to trigger win
      act(() => {
        useGameStore.getState().setBoard([
          [
            { type: CellType.One, isRevealed: true, revealClass: 'open1' },
            { type: CellType.Bomb, isRevealed: false, revealClass: 'blank' }
          ],
          [
            { type: CellType.Blank, isRevealed: true, revealClass: 'open0' },
            { type: CellType.One, isRevealed: true, revealClass: 'open1' }
          ]
        ])
      })
      
      // Click on an already revealed cell to trigger win check
      let clickResult
      act(() => {
        clickResult = result.current.handleCellClick(0, 0)
      })
      
      // Since all non-bomb cells are revealed, should detect win
      expect(clickResult?.isGameWon).toBe(true)
    })
  })

  describe('handleCellRightClick', () => {
    it('should flag an unflagged cell', () => {
      const { result } = renderHook(() => useBoard())
      const initialMines = useGameStore.getState().remainingMines
      
      let clickResult
      act(() => {
        clickResult = result.current.handleCellRightClick(0, 0)
      })
      
      const updatedBoard = result.current.board
      expect(updatedBoard[0][0].revealClass).toBe(revealMap[BOMB_FLAGGED])
      expect(useGameStore.getState().remainingMines).toBe(initialMines - 1)
      expect(clickResult?.isGameWon).toBe(false)
    })

    it('should unflag a flagged cell', () => {
      const { result } = renderHook(() => useBoard())
      const initialMines = useGameStore.getState().remainingMines
      
      // First flag the cell
      act(() => {
        result.current.handleCellRightClick(0, 0)
      })
      
      // Then unflag it
      let clickResult
      act(() => {
        clickResult = result.current.handleCellRightClick(0, 0)
      })
      
      const updatedBoard = result.current.board
      expect(updatedBoard[0][0].revealClass).toBe(revealMap[BLANK])
      expect(useGameStore.getState().remainingMines).toBe(initialMines)
    })

    it('should handle question marks when marks are enabled', () => {
      const { result } = renderHook(() => useBoard())
      
      // Enable marks
      act(() => {
        useGameStore.getState().setMarks(true)
      })
      
      // Flag the cell first
      act(() => {
        result.current.handleCellRightClick(0, 0)
      })
      
      // Unflag should go to question mark when marks enabled
      act(() => {
        result.current.handleCellRightClick(0, 0)
      })
      
      const board1 = result.current.board
      expect(board1[0][0].revealClass).toBe(revealMap[QUESTION])
      
      // Another click should remove question mark
      act(() => {
        result.current.handleCellRightClick(0, 0)
      })
      
      const board2 = result.current.board
      expect(board2[0][0].revealClass).toBe(revealMap[BLANK])
    })

    it('should detect game won after flagging', () => {
      const { result } = renderHook(() => useBoard())
      
      // Create a winning scenario board where only flags need to be placed
      const winningBoard = [
        [
          { type: CellType.One, isRevealed: true, revealClass: 'open1' },
          { type: CellType.Bomb, isRevealed: false, revealClass: 'blank' }
        ],
        [
          { type: CellType.Blank, isRevealed: true, revealClass: 'open0' },
          { type: CellType.One, isRevealed: true, revealClass: 'open1' }
        ]
      ]
      
      act(() => {
        useGameStore.getState().setBoard(winningBoard)
        useGameStore.getState().setDimensions(2, 2, 1)
      })
      
      // Flag the bomb (this should trigger win)
      let clickResult
      act(() => {
        clickResult = result.current.handleCellRightClick(0, 1)
      })
      
      expect(clickResult?.isGameWon).toBe(true)
    })
  })

  it('should maintain callback references across re-renders', () => {
    const { result, rerender } = renderHook(() => useBoard())
    
    const initialCallbacks = {
      handleCellClick: result.current.handleCellClick,
      handleCellRightClick: result.current.handleCellRightClick,
    }
    
    rerender()
    
    expect(result.current.handleCellClick).toBe(initialCallbacks.handleCellClick)
    expect(result.current.handleCellRightClick).toBe(initialCallbacks.handleCellRightClick)
  })

  it('should handle edge cases correctly', () => {
    const { result } = renderHook(() => useBoard())
    
    // Test clicking already revealed cell (should not change anything)
    const testBoard = [[{ 
      type: CellType.One, 
      isRevealed: true, 
      revealClass: 'open1' 
    }]]
    
    act(() => {
      useGameStore.getState().setBoard(testBoard)
      useGameStore.getState().setDimensions(1, 1, 0)
    })
    
    let clickResult
    act(() => {
      clickResult = result.current.handleCellClick(0, 0)
    })
    
    // Should detect game won since all non-bomb cells are revealed
    expect(clickResult).toEqual({ isGameLost: false, isGameWon: true })
  })
})