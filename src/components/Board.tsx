import { useState, useEffect, useContext, useCallback } from 'react'
import './Board.css'
import Cell from './Cell'
import { GameContext } from '../GameContext'
import { GameStatus, FaceClass } from '../types/Game'
import { MIN_TIME } from '../constants'
import { BLANK, revealMap } from '../util/board'

const getRow = (index: number, width: number) => Math.floor(index / width)
const getCol = (index: number, width: number) => index % width

const Board = () => {
  const ctx = useContext(GameContext)

  const [cells, setCells] = useState<JSX.Element[]>([])
  const [gameStatus] = ctx.gameStatus
  const [, setFaceClass] = ctx.faceClass
  const [height] = ctx.height
  const [width] = ctx.width
  const [, , , setIsTimerRunning] = ctx.timer
  const [, setRemainingMines] = ctx.remainingMines
  const [, setCurrentTime] = ctx.timer
  const [board] = ctx.board
  const [mines] = ctx.mines

  useEffect(() => {
    document.documentElement.style.setProperty('--num-cols', `${width}`)

    const currCells = []

    for (let index = 0; index < height * width; index++) {
      currCells.push(
        <Cell
          key={index}
          isRevealed={false}
          row={getRow(index, width)}
          col={getCol(index, width)}
        />
      )
    }

    setCells(currCells)
  }, [ctx, height, width])

  const endGame = useCallback(
    (faceClass: FaceClass) => {
      setFaceClass(faceClass)
      setIsTimerRunning(false)
    },
    [setFaceClass, setIsTimerRunning]
  )

  const resetBoard = useCallback(() => {
    for (let currRow = 0; currRow < height; currRow++) {
      for (let currCol = 0; currCol < width; currCol++) {
        board[currRow][currCol].isRevealed = false
        board[currRow][currCol].revealClass = revealMap[BLANK]
      }
    }
  }, [board, height, width])

  const handleNewGame = useCallback(() => {
    setCurrentTime(MIN_TIME)
    setRemainingMines(mines)
    resetBoard()
  }, [mines, resetBoard, setCurrentTime, setRemainingMines])

  // TODO : Fix missing dependencies without
  // breaking game
  useEffect(() => {
    switch (gameStatus) {
      case GameStatus.Lost:
        endGame(FaceClass.FaceDead)
        break
      case GameStatus.NewGame:
        setFaceClass(FaceClass.FaceSmile)
        handleNewGame()
        break
      case GameStatus.Won:
        endGame(FaceClass.FaceWin)
        setRemainingMines(0)
        break
    }
  }, [gameStatus])

  return <div className='board__container'>{cells}</div>
}

export default Board
