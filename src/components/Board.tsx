import { useState, useEffect, useContext } from 'react'
import './Board.css'
import Cell from './Cell'
import { GameContext } from '../GameContext'

const getRow = (index: number, width: number) => Math.floor(index / width)
const getCol = (index: number, width: number) => index % width

const Board = () => {
  const ctx = useContext(GameContext)

  const [cells, setCells] = useState<JSX.Element[]>([])

  useEffect(() => {
    const [height] = ctx.height
    const [width] = ctx.width

    document.documentElement.style.setProperty('--num-cols', `${width}`)

    const currCells = []

    for (let index = 0; index < height * width; index++) {
      currCells.push(
        <Cell
          key={index}
          isFlipped={false}
          row={getRow(index, width)}
          col={getCol(index, width)}
        />
      )
    }

    setCells(currCells)
  }, [ctx])

  return <div className='board__container'>{cells}</div>
}

export default Board
