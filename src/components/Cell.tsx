import { useContext } from 'react'
import './Cell.css'
import { GameContext } from '../GameContext'
import { BoardType, CellType, FaceClass, GameStatus } from '../types/Game'
import {
  revealMap,
  BLANK,
  BOMB_DEATH,
  BOMB_FLAGGED,
  NOT_REVEALED,
  BOMB_REVEALED,
  QUESTION,
} from '../util/board'
import { useLongPress } from '@uidotdev/usehooks'

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
  const [, , isTimerRunning, setIsTimerRunning] = ctx.timer
  const [, setFaceClass] = ctx.faceClass
  const [gameStatus, setGameStatus] = ctx.gameStatus
  const [marks] = ctx.marks

  const onStartLongPress = (event: Event) => {
    // alert(`onStartLongPress`)
    console.log(`onStartLongPress`, event)
  }

  const onFinishLongPress = () => {
    handleCellRightClick()
    alert(`onFinishLongPress`)
  }

  const onCancelLongPress = () => {
    alert(`onCancelLongPress`)
  }

  const attrs = useLongPress(
    () => {
      console.log(`longPressCallback`, event)
    },
    {
      onStart: onStartLongPress,
      onFinish: onFinishLongPress,
      onCancel: onCancelLongPress,
      threshold: 1000,
    }
  )

  const revealCell = (
    newBoard: BoardType,
    currRow: number,
    currCol: number
  ) => {
    // Validate currRow and currCol
    if (currRow < 0 || currRow >= height || currCol < 0 || currCol >= width)
      return

    // If cell has already been revealed, return
    if (
      newBoard[currRow][currCol].isRevealed ||
      newBoard[currRow][currCol].revealClass === BOMB_FLAGGED.toLowerCase()
    )
      return

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

  const showBombs = (newBoard: BoardType) => {
    for (let currRow = 0; currRow < height; currRow++) {
      for (let currCol = 0; currCol < width; currCol++) {
        if (newBoard[currRow][currCol].type === CellType.Bomb) {
          newBoard[currRow][currCol].revealClass =
            currRow === row && currCol === col
              ? revealMap[BOMB_DEATH]
              : revealMap[BOMB_REVEALED]
        }
      }
    }

    setBoard(newBoard)
  }

  const revealBoard = (newBoard: BoardType) => {
    for (let currRow = 0; currRow < height; currRow++) {
      for (let currCol = 0; currCol < width; currCol++) {
        switch (newBoard[currRow][currCol].type) {
          case CellType.Bomb:
            newBoard[currRow][currCol].revealClass = revealMap[BOMB_FLAGGED]
            break
          case CellType.Blank:
            newBoard[currRow][currCol].revealClass = revealMap[NOT_REVEALED]
            break
          default:
            newBoard[currRow][currCol].revealClass =
              revealMap[newBoard[currRow][currCol].type]
            break
        }

        board[currRow][currCol].isRevealed = true
      }
    }

    setBoard(newBoard)
  }

  // When all unrevealed cells contain bombs,
  // then game is won.
  const isGameWon = (currBoard: BoardType): boolean => {
    for (let currRow = 0; currRow < height; currRow++) {
      for (let currCol = 0; currCol < width; currCol++) {
        if (
          currBoard[currRow][currCol].type === CellType.Bomb &&
          currBoard[currRow][currCol].revealClass !== revealMap[BOMB_FLAGGED]
        ) {
          return false
        }
      }
    }

    return true
  }

  const handleCellClick = () => {
    if (gameStatus === GameStatus.Lost) {
      return
    }

    if (!isTimerRunning) {
      setIsTimerRunning(true)
    }

    const newBoard = board.map((row) => row.slice())

    if (board[row][col].type === CellType.Bomb) {
      setGameStatus(GameStatus.Lost)
      showBombs(newBoard)
      return
    }

    revealCell(newBoard, row, col)

    setBoard(newBoard)

    if (isGameWon(newBoard)) {
      setGameStatus(GameStatus.Won)
      revealBoard(newBoard)
      return
    }

    setGameStatus(GameStatus.Playing)
  }

  const handleCellRightClick = () => {
    const newBoard = board.map((row) => row.slice())

    if (newBoard[row][col].revealClass === BOMB_FLAGGED.toLowerCase()) {
      newBoard[row][col].revealClass = marks
        ? revealMap[QUESTION]
        : revealMap[BLANK]
      setRemainingMines((prev) => prev + 1)
    } else if (newBoard[row][col].revealClass === QUESTION.toLowerCase()) {
      newBoard[row][col].revealClass = revealMap[BLANK]
    } else {
      newBoard[row][col].revealClass = revealMap[BOMB_FLAGGED]
      setRemainingMines((prev) => prev - 1)
    }

    setBoard(newBoard)

    if (isGameWon(newBoard)) {
      setGameStatus(GameStatus.Won)
      revealBoard(newBoard)
      return
    }

    setGameStatus(GameStatus.Playing)
  }

  const handleOnMouseDown = () => {
    if (gameStatus === GameStatus.Lost) {
      return
    }

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
    if (gameStatus === GameStatus.Lost) {
      return
    }

    setFaceClass(FaceClass.FaceSmile)

    if (isRightMB(e)) {
      handleCellRightClick()
    }
  }

  if (row >= height || col >= width) {
    return null
  }

  return board[row][col].isRevealed ? (
    <div className={`square ${board[row][col].revealClass}`}></div>
  ) : (
    <div
      className={`noselect square ${board[row][col].revealClass}`}
      onClick={handleCellClick}
      onMouseDown={handleOnMouseDown}
      onMouseUp={handleOnMouseUp}
      onTouchStart={attrs.onTouchStart}
      onTouchEnd={attrs.onTouchEnd}
    ></div>
  )
}

export default Cell
