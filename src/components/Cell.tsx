import { useContext } from 'react'
import './Cell.css'
import { GameContext } from '../GameContext'
import { BoardType, CellType, FaceClass } from '../types/Game'
import {
  revealMap,
  BLANK,
  BOMB_DEATH,
  BOMB_FLAGGED,
  NOT_REVEALED,
} from '../util/board'

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
  const [, setRemainingMines] = ctx.remainingMines
  const [isTimerRunning, setIsTimerRunning] = ctx.isTimerRunning
  const [, setFaceClass] = ctx.faceClass

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
      newBoard[currRow][currCol].revealClass = revealMap[NOT_REVEALED]

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
    if (!isTimerRunning) {
      setIsTimerRunning(true)
    }

    const newBoard = board.map((row) => row.slice())

    revealCell(newBoard, row, col)

    setBoard(newBoard)
  }

  const handleCellRightClick = () => {
    const newBoard = board.map((row) => row.slice())

    if (newBoard[row][col].revealClass === BOMB_FLAGGED.toLowerCase()) {
      newBoard[row][col].revealClass = revealMap[BLANK]
      setRemainingMines((prev) => prev + 1)
    } else {
      newBoard[row][col].revealClass = revealMap[BOMB_FLAGGED]
      setRemainingMines((prev) => prev - 1)
    }

    setBoard(newBoard)
  }

  const handleOnMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    setFaceClass(FaceClass.FaceOoh)
  }

  const isRightMB = (e: React.MouseEvent<HTMLElement>) => {
    let rightMB = false

    if ('which' in e)
      // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
      rightMB = e.which == 3
    else if ('button' in e)
      // IE, Opera
      rightMB = e.button == 2

    return rightMB
  }

  const handleOnMouseUp = (e: React.MouseEvent<HTMLElement>) => {
    setFaceClass(FaceClass.FaceSmile)

    if (isRightMB(e)) {
      handleCellRightClick()
    }
  }

  return board[row][col].isRevealed ? (
    <div className={`square ${board[row][col].revealClass}`}></div>
  ) : (
    <div
      className={`square ${board[row][col].revealClass}`}
      onClick={handleCellClick}
      onMouseDown={handleOnMouseDown}
      onMouseUp={handleOnMouseUp}
    ></div>
  )
}

export default Cell
