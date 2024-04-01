import { useState, useEffect } from 'react'
import './Board.css'
import Cell from './Cell'

const Board = () => {
  const [numRows, setNumRows] = useState(16)
  const [numCols, setNumCols] = useState(30)
  const [cells, setCells] = useState<JSX.Element[]>([])

  useEffect(() => {
    document.documentElement.style.setProperty('--num-cols', `${numCols}`)

    const currCells = []

    for (let index = 0; index < numRows * numCols; index++) {
      currCells.push(<Cell />)
    }

    setCells(currCells)
  }, [numCols, numRows])

  return <div className='board__container'>{cells}</div>
}

export default Board
