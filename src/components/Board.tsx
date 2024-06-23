import { useState, useEffect, useContext, useCallback } from 'react'
import './Board.css'
import Cell from './Cell'
import { GameContext } from '../GameContext'
import { GameStatus, FaceClass } from '../types/Game'

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

  const lostGame = useCallback(() => {
    setFaceClass(FaceClass.FaceDead)
    setIsTimerRunning(false)
  }, [setFaceClass, setIsTimerRunning])

  useEffect(() => {
    switch (gameStatus) {
      case GameStatus.Lost:
        lostGame()
        break
    }
  }, [gameStatus, lostGame])

  return <div className='board__container'>{cells}</div>
}

export default Board
