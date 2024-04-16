/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useState } from 'react'
import './Header.css'
import smileyFace from '../assets/happiness.png'
// import sadFace from '../assets/sad.png'
import Dialog, { BoardData, GameType } from './Dialog'

const Header = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [currBoardData, setCurrBoardData] = useState<BoardData>({
    height: 9,
    width: 9,
    mines: 10,
    gameType: GameType.Beginner,
    marks: false,
  })

  const closeModal = (boardData?: BoardData) => {
    setModalIsOpen(false)
    boardData && setCurrBoardData(boardData)
    console.log(`boardData`, boardData)
  }

  const handleButtonClick = () => {
    setModalIsOpen(true)
  }
  return (
    <>
      <div className='header__container'>
        <button className='header__smiley' onClick={handleButtonClick}>
          <img src={smileyFace} alt='Happy' />
        </button>
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
