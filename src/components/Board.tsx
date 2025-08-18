import { useEffect, memo, useMemo } from 'react'
import './Board.css'
import Cell from './Cell'
import { useBoard } from '../hooks/useBoard'
import { useTimer } from '../hooks/useTimer'

const getRow = (index: number, width: number) => Math.floor(index / width)
const getCol = (index: number, width: number) => index % width

const Board = memo(() => {
  const { height, width } = useBoard()
  useTimer() // Initialize timer

  const cells = useMemo(() => {
    const cellsArray = []
    for (let index = 0; index < height * width; index++) {
      cellsArray.push(
        <Cell
          key={index}
          row={getRow(index, width)}
          col={getCol(index, width)}
        />
      )
    }
    return cellsArray
  }, [height, width])

  useEffect(() => {
    document.documentElement.style.setProperty('--num-cols', `${width}`)
  }, [width])

  return <div className='board__container'>{cells}</div>
})

export default Board
