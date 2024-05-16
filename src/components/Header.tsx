/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useState, useEffect, useContext } from 'react'
import './Header.css'
import Dialog from './Dialog'
import { BoardData, GameType } from '../types/Game'
import { GameContext } from '../GameContext'
import Mines from './Mines'
import Time from './Time'

const Header = () => {
  const ctx = useContext(GameContext)

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [currBoardData, setCurrBoardData] = useState<BoardData>({
    height: 9,
    width: 9,
    mines: 10,
    gameType: GameType.Beginner,
    marks: false,
  })

  const closeModal = (boardData: BoardData) => {
    setModalIsOpen(false)
    boardData && setCurrBoardData(boardData)
  }

  const handleButtonClick = () => {
    setModalIsOpen(true)
  }

  useEffect(() => {
    const [, setHeight] = ctx.height
    const [, setWidth] = ctx.width
    const [, setMines] = ctx.mines
    const [, setMarks] = ctx.marks

    setHeight(currBoardData.height)
    setWidth(currBoardData.width)
    setMines(currBoardData.mines)
    setMarks(currBoardData.marks)
  }, [currBoardData, ctx])

  return (
    <>
      <div className='header__container'>
        <Mines />
        <button
          className='header__face facedead'
          onClick={handleButtonClick}
        ></button>
        <Time />
      </div>
      <Dialog
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        initBoardData={currBoardData}
      />
    </>
  )
}

export default Header
