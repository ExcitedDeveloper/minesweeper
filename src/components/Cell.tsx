import { useContext } from 'react'
import './Cell.css'
import { GameContext } from '../GameContext'

type CellProps = {
  row: number
  col: number
}

const handleCellClick = (row: number, col: number) => {
  console.log(`clicked row = ${row}, col = ${col}`)
}

const Cell = ({ row, col }: CellProps) => {
  const ctx = useContext(GameContext)
  const [board] = ctx.board

  return board[row][col].isFlipped ? (
    <div className='square open0'></div>
  ) : (
    <div
      className='square blank'
      onClick={() => handleCellClick(row, col)}
    ></div>
  )
}

export default Cell
