import { describe, it, expect } from 'vitest'
import { GameType, CellType, FaceClass, GameStatus } from './Game'
import type { BoardData, CellState, BoardType } from './Game'

describe('Game types', () => {
  describe('GameType enum', () => {
    it('should have correct values', () => {
      expect(GameType.Beginner).toBe('beginner')
      expect(GameType.Intermediate).toBe('intermediate')
      expect(GameType.Expert).toBe('expert')
      expect(GameType.Custom).toBe('custom')
    })

    it('should have all expected values', () => {
      const values = Object.values(GameType)
      expect(values).toContain('beginner')
      expect(values).toContain('intermediate')
      expect(values).toContain('expert')
      expect(values).toContain('custom')
      expect(values).toHaveLength(4)
    })
  })

  describe('CellType enum', () => {
    it('should have correct values', () => {
      expect(CellType.Blank).toBe('K')
      expect(CellType.Bomb).toBe('B')
      expect(CellType.One).toBe('1')
      expect(CellType.Two).toBe('2')
      expect(CellType.Three).toBe('3')
      expect(CellType.Four).toBe('4')
      expect(CellType.Five).toBe('5')
      expect(CellType.Six).toBe('6')
      expect(CellType.Seven).toBe('7')
      expect(CellType.Eight).toBe('8')
    })

    it('should have all number types', () => {
      const numberTypes = [CellType.One, CellType.Two, CellType.Three, CellType.Four, CellType.Five, CellType.Six, CellType.Seven, CellType.Eight]
      expect(numberTypes).toHaveLength(8)
      numberTypes.forEach((type, index) => {
        expect(type).toBe(String(index + 1))
      })
    })
  })

  describe('FaceClass enum', () => {
    it('should have correct values', () => {
      expect(FaceClass.FaceDead).toBe('facedead')
      expect(FaceClass.FaceOoh).toBe('faceooh')
      expect(FaceClass.FacePressed).toBe('facepressed')
      expect(FaceClass.FaceSmile).toBe('facesmile')
      expect(FaceClass.FaceWin).toBe('facewin')
    })

    it('should have all expected face states', () => {
      const values = Object.values(FaceClass)
      expect(values).toContain('facedead')
      expect(values).toContain('faceooh')
      expect(values).toContain('facepressed')
      expect(values).toContain('facesmile')
      expect(values).toContain('facewin')
      expect(values).toHaveLength(5)
    })
  })

  describe('GameStatus enum', () => {
    it('should have correct numeric values', () => {
      expect(GameStatus.Lost).toBe(0)
      expect(GameStatus.NewGame).toBe(1)
      expect(GameStatus.Playing).toBe(2)
      expect(GameStatus.StartGame).toBe(3)
      expect(GameStatus.Won).toBe(4)
    })

    it('should have all expected statuses', () => {
      const keys = Object.keys(GameStatus).filter(key => isNaN(Number(key)))
      expect(keys).toContain('Lost')
      expect(keys).toContain('NewGame')
      expect(keys).toContain('Playing')
      expect(keys).toContain('StartGame')
      expect(keys).toContain('Won')
      expect(keys).toHaveLength(5)
    })
  })

  describe('Type interfaces', () => {
    it('should create valid BoardData objects', () => {
      const boardData: BoardData = {
        gameType: GameType.Beginner,
        height: 9,
        width: 9,
        mines: 10,
        marks: false
      }

      expect(boardData.gameType).toBe(GameType.Beginner)
      expect(boardData.height).toBe(9)
      expect(boardData.width).toBe(9)
      expect(boardData.mines).toBe(10)
      expect(boardData.marks).toBe(false)
    })

    it('should create valid CellState objects', () => {
      const cellState: CellState = {
        type: CellType.One,
        isRevealed: true,
        revealClass: 'open1'
      }

      expect(cellState.type).toBe(CellType.One)
      expect(cellState.isRevealed).toBe(true)
      expect(cellState.revealClass).toBe('open1')
    })

    it('should create valid BoardType arrays', () => {
      const board: BoardType = [
        [
          { type: CellType.One, isRevealed: false, revealClass: 'blank' },
          { type: CellType.Bomb, isRevealed: false, revealClass: 'blank' }
        ],
        [
          { type: CellType.Blank, isRevealed: true, revealClass: 'open0' },
          { type: CellType.Two, isRevealed: false, revealClass: 'blank' }
        ]
      ]

      expect(board).toHaveLength(2)
      expect(board[0]).toHaveLength(2)
      expect(board[1]).toHaveLength(2)
      expect(board[0][0].type).toBe(CellType.One)
      expect(board[0][1].type).toBe(CellType.Bomb)
      expect(board[1][0].type).toBe(CellType.Blank)
      expect(board[1][1].type).toBe(CellType.Two)
    })
  })

  describe('Type compatibility', () => {
    it('should work with different GameTypes in BoardData', () => {
      const configs: BoardData[] = [
        { gameType: GameType.Beginner, height: 9, width: 9, mines: 10, marks: false },
        { gameType: GameType.Intermediate, height: 16, width: 16, mines: 40, marks: true },
        { gameType: GameType.Expert, height: 16, width: 30, mines: 99, marks: false },
        { gameType: GameType.Custom, height: 20, width: 20, mines: 50, marks: true }
      ]

      expect(configs).toHaveLength(4)
      configs.forEach(config => {
        expect(Object.values(GameType)).toContain(config.gameType)
      })
    })

    it('should work with all CellTypes in CellState', () => {
      const allCellTypes = Object.values(CellType)
      
      allCellTypes.forEach(cellType => {
        const cellState: CellState = {
          type: cellType,
          isRevealed: false,
          revealClass: 'blank'
        }
        expect(cellState.type).toBe(cellType)
      })
    })
  })
})