import { BoardType, CellType } from '../types/Game'

export class GameEngine {
  /**
   * Checks if the game is won by verifying that all non-bomb cells are revealed
   * and all bomb cells are properly flagged or all non-bomb cells are revealed.
   */
  static isGameWon(board: BoardType, height: number, width: number): boolean {
    let unrevealedNonBombs = 0

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const cell = board[row][col]
        
        if (cell.type !== CellType.Bomb && !cell.isRevealed) {
          unrevealedNonBombs++
        }
      }
    }

    // Game is won if all non-bomb cells are revealed
    return unrevealedNonBombs === 0
  }

  /**
   * Calculates the number of adjacent mines for a given cell position
   */
  static countAdjacentMines(
    board: BoardType,
    row: number,
    col: number,
    height: number,
    width: number
  ): number {
    let count = 0
    
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ]

    for (const [dr, dc] of directions) {
      const newRow = row + dr
      const newCol = col + dc
      
      if (
        newRow >= 0 && 
        newRow < height && 
        newCol >= 0 && 
        newCol < width &&
        board[newRow][newCol].type === CellType.Bomb
      ) {
        count++
      }
    }

    return count
  }

  /**
   * Gets all valid adjacent cell positions for a given position
   */
  static getAdjacentPositions(
    row: number,
    col: number,
    height: number,
    width: number
  ): Array<[number, number]> {
    const positions: Array<[number, number]> = []
    
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ]

    for (const [dr, dc] of directions) {
      const newRow = row + dr
      const newCol = col + dc
      
      if (newRow >= 0 && newRow < height && newCol >= 0 && newCol < width) {
        positions.push([newRow, newCol])
      }
    }

    return positions
  }

  /**
   * Validates if a position is within board bounds
   */
  static isValidPosition(
    row: number,
    col: number,
    height: number,
    width: number
  ): boolean {
    return row >= 0 && row < height && col >= 0 && col < width
  }
}