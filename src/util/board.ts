import { BoardType, CellType } from '../types/Game'

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const createBoard = (
  width: number,
  height: number,
  mines: number
): BoardType => {
  // Initialize board
  const currBoard: BoardType = new Array(height)
    .fill(CellType.Blank)
    .map(() => new Array(width).fill(CellType.Blank))

  // Set mines
  for (let i = 0; i < mines; i++) {
    let rndWidth = randomIntFromInterval(1, width)
    let rndHeight = randomIntFromInterval(1, height)

    while (currBoard[rndHeight - 1][rndWidth - 1] === CellType.Bomb) {
      rndWidth = randomIntFromInterval(1, width)
      rndHeight = randomIntFromInterval(1, height)
    }

    currBoard[rndHeight - 1][rndWidth - 1] = CellType.Bomb
  }

  return currBoard
}
