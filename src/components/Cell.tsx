import { memo, useCallback } from 'react'
import './Cell.css'
import { FaceClass, GameStatus } from '../types/Game'
import { useGameState } from '../hooks/useGameState'
import { useBoard } from '../hooks/useBoard'
import { useLongPress } from '@uidotdev/usehooks'

type CellProps = {
  row: number
  col: number
}

const Cell = memo(({ row, col }: CellProps) => {
  const { gameStatus, setFaceClass, handleGameStart, handleGameWon, handleGameLost } = useGameState()
  const { board, height, width, handleCellClick, handleCellRightClick } = useBoard()

  const onCellClick = useCallback(() => {
    if (gameStatus === GameStatus.Lost) {
      return
    }

    handleGameStart()
    
    const result = handleCellClick(row, col)
    
    if (result.isGameLost) {
      handleGameLost()
    } else if (result.isGameWon) {
      handleGameWon()
    }
  }, [gameStatus, handleGameStart, handleCellClick, row, col, handleGameLost, handleGameWon])

  const onCellRightClick = useCallback(() => {
    const result = handleCellRightClick(row, col)
    
    if (result.isGameWon) {
      handleGameWon()
    }
  }, [handleCellRightClick, row, col, handleGameWon])

  const onFinishLongPress = useCallback((e: Event) => {
    e.preventDefault()
    onCellRightClick()
  }, [onCellRightClick])

  const attrs = useLongPress(
    () => {
      console.log(`longPressCallback`)
    },
    {
      onFinish: onFinishLongPress,
      threshold: 500,
    }
  )

  const handleOnMouseDown = useCallback(() => {
    if (gameStatus === GameStatus.Lost) {
      return
    }
    setFaceClass(FaceClass.FaceOoh)
  }, [gameStatus, setFaceClass])

  const isRightMB = useCallback((e: React.MouseEvent<HTMLElement>) => {
    return e.button === 2
  }, [])

  const handleOnMouseUp = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (gameStatus === GameStatus.Lost) {
      return
    }

    setFaceClass(FaceClass.FaceSmile)

    if (isRightMB(e)) {
      onCellRightClick()
    }
  }, [gameStatus, setFaceClass, isRightMB, onCellRightClick])

  if (row >= height || col >= width) {
    return null
  }

  return board[row][col].isRevealed ? (
    <div className={`square ${board[row][col].revealClass}`}></div>
  ) : (
    <div
      className={`noselect square ${board[row][col].revealClass}`}
      onClick={onCellClick}
      onMouseDown={handleOnMouseDown}
      onMouseUp={handleOnMouseUp}
      onTouchStart={attrs.onTouchStart}
      onTouchEnd={attrs.onTouchEnd}
    ></div>
  )
})

export default Cell
