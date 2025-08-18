import { describe, it, expect } from 'vitest'
import { GameEngine } from './GameEngine'
import { CellType } from '../types/Game'

describe('GameEngine', () => {
  describe('isValidPosition', () => {
    it('should return true for valid positions', () => {
      expect(GameEngine.isValidPosition(0, 0, 9, 9)).toBe(true)
      expect(GameEngine.isValidPosition(4, 4, 9, 9)).toBe(true)
      expect(GameEngine.isValidPosition(8, 8, 9, 9)).toBe(true)
    })

    it('should return false for invalid positions', () => {
      expect(GameEngine.isValidPosition(-1, 0, 9, 9)).toBe(false)
      expect(GameEngine.isValidPosition(0, -1, 9, 9)).toBe(false)
      expect(GameEngine.isValidPosition(9, 0, 9, 9)).toBe(false)
      expect(GameEngine.isValidPosition(0, 9, 9, 9)).toBe(false)
    })
  })

  describe('getAdjacentPositions', () => {
    it('should return all 8 adjacent positions for center cell', () => {
      const positions = GameEngine.getAdjacentPositions(4, 4, 9, 9)
      expect(positions).toHaveLength(8)
      expect(positions).toContainEqual([3, 3])
      expect(positions).toContainEqual([3, 4])
      expect(positions).toContainEqual([3, 5])
      expect(positions).toContainEqual([4, 3])
      expect(positions).toContainEqual([4, 5])
      expect(positions).toContainEqual([5, 3])
      expect(positions).toContainEqual([5, 4])
      expect(positions).toContainEqual([5, 5])
    })

    it('should return 3 adjacent positions for corner cell', () => {
      const positions = GameEngine.getAdjacentPositions(0, 0, 9, 9)
      expect(positions).toHaveLength(3)
      expect(positions).toContainEqual([0, 1])
      expect(positions).toContainEqual([1, 0])
      expect(positions).toContainEqual([1, 1])
    })

    it('should return 5 adjacent positions for edge cell', () => {
      const positions = GameEngine.getAdjacentPositions(0, 4, 9, 9)
      expect(positions).toHaveLength(5)
    })
  })

  describe('isGameWon', () => {
    it('should return true when all non-bomb cells are revealed', () => {
      const board = [
        [
          { type: CellType.One, isRevealed: true, revealClass: 'open1' },
          { type: CellType.Bomb, isRevealed: false, revealClass: 'blank' }
        ],
        [
          { type: CellType.Blank, isRevealed: true, revealClass: 'open0' },
          { type: CellType.Two, isRevealed: true, revealClass: 'open2' }
        ]
      ]

      expect(GameEngine.isGameWon(board, 2, 2)).toBe(true)
    })

    it('should return false when non-bomb cells are not revealed', () => {
      const board = [
        [
          { type: CellType.One, isRevealed: false, revealClass: 'blank' },
          { type: CellType.Bomb, isRevealed: false, revealClass: 'blank' }
        ],
        [
          { type: CellType.Blank, isRevealed: true, revealClass: 'open0' },
          { type: CellType.Two, isRevealed: true, revealClass: 'open2' }
        ]
      ]

      expect(GameEngine.isGameWon(board, 2, 2)).toBe(false)
    })
  })

  describe('countAdjacentMines', () => {
    it('should count adjacent bombs correctly', () => {
      const board = [
        [
          { type: CellType.Bomb, isRevealed: false, revealClass: 'blank' },
          { type: CellType.Bomb, isRevealed: false, revealClass: 'blank' },
          { type: CellType.One, isRevealed: false, revealClass: 'blank' }
        ],
        [
          { type: CellType.Bomb, isRevealed: false, revealClass: 'blank' },
          { type: CellType.Three, isRevealed: false, revealClass: 'blank' },
          { type: CellType.Two, isRevealed: false, revealClass: 'blank' }
        ],
        [
          { type: CellType.One, isRevealed: false, revealClass: 'blank' },
          { type: CellType.Two, isRevealed: false, revealClass: 'blank' },
          { type: CellType.One, isRevealed: false, revealClass: 'blank' }
        ]
      ]

      // Center cell (1,1) should have 3 adjacent bombs
      expect(GameEngine.countAdjacentMines(board, 1, 1, 3, 3)).toBe(3)
      
      // Corner cell (2,2) should have 0 adjacent bombs (only numbered cells around it)
      expect(GameEngine.countAdjacentMines(board, 2, 2, 3, 3)).toBe(0)
      
      // Edge cell (0,2) should have 1 adjacent bomb (only one bomb neighbor)
      expect(GameEngine.countAdjacentMines(board, 0, 2, 3, 3)).toBe(1)
    })
  })
})