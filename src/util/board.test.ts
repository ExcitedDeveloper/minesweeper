import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createBoard, revealMap, BLANK, BOMB_DEATH, BOMB_REVEALED, BOMB_FLAGGED, NOT_REVEALED, QUESTION } from './board'
import { CellType } from '../types/Game'

describe('board utility functions', () => {
  describe('createBoard', () => {
    beforeEach(() => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5)
      vi.clearAllMocks()
    })

    it('should create a board with correct dimensions', () => {
      const board = createBoard(3, 3, 1)
      expect(board).toHaveLength(3)
      expect(board[0]).toHaveLength(3)
      expect(board[1]).toHaveLength(3)
      expect(board[2]).toHaveLength(3)
    })

    it('should place the correct number of mines', () => {
      const board = createBoard(5, 5, 5)
      let mineCount = 0
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
          if (board[row][col].type === CellType.Bomb) {
            mineCount++
          }
        }
      }
      expect(mineCount).toBe(5)
    })

    it('should initialize all cells as unrevealed', () => {
      const board = createBoard(3, 3, 1)
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          expect(board[row][col].isRevealed).toBe(false)
        }
      }
    })

    it('should set correct cell types based on adjacent mines', () => {
      // Mock Math.random to place mine at specific position
      vi.spyOn(Math, 'random').mockReturnValue(0.1) // This should place mine at [0,0]
      
      const board = createBoard(3, 3, 1)
      
      // Find the mine
      let mineRow = -1
      let mineCol = -1
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (board[row][col].type === CellType.Bomb) {
            mineRow = row
            mineCol = col
            break
          }
        }
        if (mineRow !== -1) break
      }
      
      expect(mineRow).not.toBe(-1)
      expect(mineCol).not.toBe(-1)
      
      // Check that adjacent cells have correct numbers
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (board[row][col].type !== CellType.Bomb) {
            // Count adjacent mines manually
            let expectedCount = 0
            for (let dr = -1; dr <= 1; dr++) {
              for (let dc = -1; dc <= 1; dc++) {
                const newRow = row + dr
                const newCol = col + dc
                if (newRow >= 0 && newRow < 3 && newCol >= 0 && newCol < 3) {
                  if (newRow === mineRow && newCol === mineCol) {
                    expectedCount++
                  }
                }
              }
            }
            
            const expectedType = expectedCount === 0 ? CellType.Blank :
                               expectedCount === 1 ? CellType.One :
                               expectedCount === 2 ? CellType.Two :
                               expectedCount === 3 ? CellType.Three :
                               expectedCount === 4 ? CellType.Four :
                               expectedCount === 5 ? CellType.Five :
                               expectedCount === 6 ? CellType.Six :
                               expectedCount === 7 ? CellType.Seven :
                               CellType.Eight
            
            expect(board[row][col].type).toBe(expectedType)
          }
        }
      }
    })

    it('should handle edge case with no mines', () => {
      const board = createBoard(2, 2, 0)
      expect(board).toHaveLength(2)
      expect(board[0]).toHaveLength(2)
      
      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 2; col++) {
          expect(board[row][col].type).toBe(CellType.Blank)
          expect(board[row][col].isRevealed).toBe(false)
        }
      }
    })

    it('should handle single cell board', () => {
      const board = createBoard(1, 1, 0)
      expect(board).toHaveLength(1)
      expect(board[0]).toHaveLength(1)
      expect(board[0][0].type).toBe(CellType.Blank)
      expect(board[0][0].isRevealed).toBe(false)
    })

    it('should not place mines in the same position twice', () => {
      // Create a small board with many mines to test collision handling
      const board = createBoard(2, 2, 4)
      let mineCount = 0
      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 2; col++) {
          if (board[row][col].type === CellType.Bomb) {
            mineCount++
          }
        }
      }
      expect(mineCount).toBe(4) // All cells should be mines
    })
  })

  describe('revealMap constants', () => {
    it('should have correct reveal map values', () => {
      expect(revealMap[BLANK]).toBe('blank')
      expect(revealMap[BOMB_DEATH]).toBe('bombdeath')
      expect(revealMap[BOMB_REVEALED]).toBe('bombrevealed')
      expect(revealMap[BOMB_FLAGGED]).toBe('bombflagged')
      expect(revealMap[NOT_REVEALED]).toBe('open0')
      expect(revealMap[QUESTION]).toBe('question')
      expect(revealMap['1']).toBe('open1')
      expect(revealMap['2']).toBe('open2')
      expect(revealMap['3']).toBe('open3')
      expect(revealMap['4']).toBe('open4')
      expect(revealMap['5']).toBe('open5')
      expect(revealMap['6']).toBe('open6')
      expect(revealMap['7']).toBe('open7')
      expect(revealMap['8']).toBe('open8')
    })

    it('should export correct constant values', () => {
      expect(BLANK).toBe('Blank')
      expect(BOMB_DEATH).toBe('D')
      expect(BOMB_REVEALED).toBe('BombRevealed')
      expect(BOMB_FLAGGED).toBe('BombFlagged')
      expect(NOT_REVEALED).toBe('K')
      expect(QUESTION).toBe('Question')
    })
  })
})