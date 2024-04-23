import { useState, useEffect, useContext } from 'react'
import './Board.css'
import Cell from './Cell'
import { GameContext } from '../GameContext'

const Board = () => {
  const ctx = useContext(GameContext)

  const [cells, setCells] = useState<JSX.Element[]>([])

  useEffect(() => {
    if (!ctx) return

    const [height] = ctx.height
    const [width] = ctx.width

    document.documentElement.style.setProperty('--num-cols', `${width}`)

    const currCells = []

    for (let index = 0; index < height * width; index++) {
      currCells.push(<Cell key={index} />)
    }

    setCells(currCells)
  }, [ctx])

  return <div className='board__container'>{cells}</div>
}

export default Board
