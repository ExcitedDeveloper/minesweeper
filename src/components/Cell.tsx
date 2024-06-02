import { useContext, useState } from 'react'
import './Cell.css'
import { GameContext } from '../GameContext'
import { BoardType, CellType } from '../types/Game'

type CellProps = {
  isRevealed: boolean
  row: number
  col: number
}

const BLANK = 'K'
const BOMB_DEATH = 'D'

const revealMap: { [key: string]: string } = {
  BLANK: 'bombrevealed',
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

const Cell = ({ row, col }: CellProps) => {
  const ctx = useContext(GameContext)
  const [height] = ctx.height
  const [width] = ctx.width
  const [board, setBoard] = ctx.board
  const [revealClass, setRevealClass] = useState(revealMap[BLANK])

  const revealCell = (
    newBoard: BoardType,
    currRow: number,
    currCol: number
  ) => {
    console.log(`revealCell 1`)
    // Validate currRow and currCol
    if (currRow < 0 || currRow >= height || currCol < 0 || currCol >= width)
      return

    // If cell has already been revealed, return
    if (newBoard[currRow][currCol].isRevealed) return

    if (newBoard[currRow][currCol].type === CellType.Blank) {
      // Clicked on a blank.  Reveal it.
      newBoard[currRow][currCol].isRevealed = true

      // Reveal adjacent cells

      // Reveal upper left
      revealCell(newBoard, currRow - 1, currCol - 1)

      // Reveal upper middle
      revealCell(newBoard, currRow - 1, currCol)

      // Reveal upper right
      revealCell(newBoard, currRow - 1, currCol + 1)

      // Reveal left
      revealCell(newBoard, currRow, currCol - 1)

      // Reveal right
      revealCell(newBoard, currRow, currCol + 1)

      // Reveal lower left
      revealCell(newBoard, currRow + 1, currCol - 1)

      // Reveal lower middle
      revealCell(newBoard, currRow + 1, currCol)

      // Reveal lower right
      revealCell(newBoard, currRow + 1, currCol + 1)
    } else if (newBoard[currRow][currCol].type === CellType.Bomb) {
      // Clicked on a bomb
      newBoard[currRow][currCol].isRevealed = true
      setRevealClass(revealMap[BOMB_DEATH])
    } else {
      // Clicked on a number
      newBoard[currRow][currCol].isRevealed = true
      setRevealClass(revealMap[newBoard[currRow][currCol].type])
    }
  }

  const handleCellClick = () => {
    console.log(`clicked row = ${row}, col = ${col}`)

    const newBoard = board.map((row) => row.slice())
    revealCell(newBoard, row, col)
    setBoard(newBoard)
  }

  return board[row][col].isRevealed ? (
    <div className={`square ${revealClass}`}></div>
  ) : (
    <div className='square blank' onClick={handleCellClick}></div>
  )
}

export default Cell
