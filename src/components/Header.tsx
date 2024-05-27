/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useState, useEffect, useContext } from 'react'
import './Header.css'
import Dialog from './Dialog'
import { BoardData, GameType } from '../types/Game'
import { GameContext } from '../GameContext'
import Mines from './Mines'
import Time from './Time'
import {
  MIN_CUSTOM_MINES,
  MAX_CUSTOM_MINES,
  BEGINNER_WIDTH,
  BEGINNER_HEIGHT,
  BEGINNER_MINES,
} from '../constants'

const Header = () => {
  const ctx = useContext(GameContext)

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [currBoardData, setCurrBoardData] = useState<BoardData>({
    height: BEGINNER_HEIGHT,
    width: BEGINNER_WIDTH,
    mines: BEGINNER_MINES,
    gameType: GameType.Beginner,
    marks: false,
    remainingMines: BEGINNER_MINES,
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
    setMines((prev) => {
      return currBoardData.mines < MIN_CUSTOM_MINES ||
        currBoardData.mines > MAX_CUSTOM_MINES
        ? prev
        : currBoardData.mines
    })
    setMarks(currBoardData.marks)
  }, [currBoardData, ctx])

  useEffect(() => {
    const [mines] = ctx.mines
    const [, setRemainingMines] = ctx.remainingMines
    setRemainingMines(mines)
  }, [ctx.mines, ctx.remainingMines])

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
