import { BoardType, CellType } from '../types/Game'

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const cellTypeMap: { [key: number]: CellType } = {
  0: CellType.Blank,
  1: CellType.One,
  2: CellType.Two,
  3: CellType.Three,
  4: CellType.Four,
  5: CellType.Five,
  6: CellType.Six,
  7: CellType.Seven,
  8: CellType.Eight,
}

const getNumOfAdjacentMines = (
  currBoard: BoardType,
  height: number,
  width: number,
  row: number,
  col: number
) => {
  let count = 0

  // upper left
  count =
    row - 1 >= 0 &&
    col - 1 >= 0 &&
    currBoard[row - 1][col - 1].type === CellType.Bomb
      ? count + 1
      : count

  // upper center
  count =
    row - 1 >= 0 && currBoard[row - 1][col].type === CellType.Bomb
      ? count + 1
      : count

  // upper right
  count =
    row - 1 >= 0 &&
    col + 1 < width &&
    currBoard[row - 1][col + 1].type === CellType.Bomb
      ? count + 1
      : count

  // left
  count =
    col - 1 >= 0 && currBoard[row][col - 1].type === CellType.Bomb
      ? count + 1
      : count

  // right
  count =
    col + 1 < width && currBoard[row][col + 1].type === CellType.Bomb
      ? count + 1
      : count

  // lower left
  count =
    row + 1 < height &&
    col - 1 >= 0 &&
    currBoard[row + 1][col - 1].type === CellType.Bomb
      ? count + 1
      : count

  // lower center
  count =
    row + 1 < height && currBoard[row + 1][col].type === CellType.Bomb
      ? count + 1
      : count

  // lower right
  count =
    row + 1 < height &&
    col + 1 < width &&
    currBoard[row + 1][col + 1].type === CellType.Bomb
      ? count + 1
      : count

  return count
}

export const createBoard = (
  width: number,
  height: number,
  mines: number
): BoardType => {
  // Initialize board
  const currBoard: BoardType = []

  for (let row = 0; row < height; row++) {
    currBoard[row] = []
    for (let col = 0; col < width; col++) {
      currBoard[row][col] = {
        type: CellType.Blank,
        isRevealed: false,
        revealClass: revealMap[BLANK],
      }
    }
  }

  // Set mines
  for (let i = 0; i < mines; i++) {
    let rndWidth = randomIntFromInterval(1, width)
    let rndHeight = randomIntFromInterval(1, height)

    while (currBoard[rndHeight - 1][rndWidth - 1].type === CellType.Bomb) {
      rndWidth = randomIntFromInterval(1, width)
      rndHeight = randomIntFromInterval(1, height)
    }

    currBoard[rndHeight - 1][rndWidth - 1].type = CellType.Bomb
  }

  // Set the rest of the board
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      // if the current cell has a bomb, continue
      if (currBoard[row][col].type === CellType.Bomb) continue

      const bombs: number = getNumOfAdjacentMines(
        currBoard,
        height,
        width,
        row,
        col
      )

      currBoard[row][col].type = cellTypeMap[bombs]
    }
  }

  return currBoard
}

export const revealMap: { [key: string]: string } = {
  Blank: 'blank',
  BombFlagged: 'bombflagged',
  BombRevealed: 'bombrevealed',
  D: 'bombdeath',
  K: 'open0',
  '1': 'open1',
  '2': 'open2',
  '3': 'open3',
  '4': 'open4',
  '5': 'open5',
  '6': 'open6',
  '7': 'open7',
  '8': 'open8',
}

export const BLANK = 'Blank'
export const BOMB_DEATH = 'D'
export const BOMB_REVEALED = 'bombrevealed'
export const BOMB_FLAGGED = 'BombFlagged'
export const NOT_REVEALED = 'K'
