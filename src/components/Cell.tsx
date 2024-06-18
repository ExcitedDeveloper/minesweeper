import { useContext } from 'react'
import './Cell.css'
import { GameContext } from '../GameContext'
import { BoardType, CellType } from '../types/Game'
import { revealMap, BLANK, BOMB_DEATH } from '../util/board'

type CellProps = {
  isRevealed: boolean
  row: number
  col: number
}

const Cell = ({ row, col }: CellProps) => {
  const ctx = useContext(GameContext)
  const [height] = ctx.height
  const [width] = ctx.width
  const [board, setBoard] = ctx.board

  const revealCell = (
    newBoard: BoardType,
    currRow: number,
    currCol: number
  ) => {
    // Validate currRow and currCol
    if (currRow < 0 || currRow >= height || currCol < 0 || currCol >= width)
      return

    // If cell has already been revealed, return
    if (newBoard[currRow][currCol].isRevealed) return

    if (newBoard[currRow][currCol].type === CellType.Blank) {
      // Clicked on a blank.  Reveal it.
      newBoard[currRow][currCol].isRevealed = true
      newBoard[currRow][currCol].revealClass = revealMap[BLANK]

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
      newBoard[currRow][currCol].revealClass = revealMap[BOMB_DEATH]
    } else {
      // Clicked on a number
      newBoard[currRow][currCol].isRevealed = true
      newBoard[currRow][currCol].revealClass =
        revealMap[newBoard[currRow][currCol].type]
    }
  }

  const handleCellClick = () => {
    const newBoard = board.map((row) => row.slice())
    revealCell(newBoard, row, col)
    setBoard(newBoard)
  }

  return board[row][col].isRevealed ? (
    <div className={`square ${board[row][col].revealClass}`}></div>
  ) : (
    <div className='square blank' onClick={handleCellClick}></div>
  )
}

export default Cell
