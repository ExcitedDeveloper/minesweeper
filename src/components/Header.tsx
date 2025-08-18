import { useState, useEffect, memo } from 'react'
import './Header.css'
import Dialog from './Dialog'
import { BoardData, GameType } from '../types/Game'
import { useGameState } from '../hooks/useGameState'
import { useGameStore } from '../store/gameStore'
import Mines from './Mines'
import Time from './Time'
import {
  MIN_CUSTOM_MINES,
  MAX_CUSTOM_MINES,
  BEGINNER_WIDTH,
  BEGINNER_HEIGHT,
  BEGINNER_MINES,
} from '../constants'

const Header = memo(() => {
  const { faceClass } = useGameState()
  const setDimensions = useGameStore((state) => state.setDimensions)
  const setMarks = useGameStore((state) => state.setMarks)

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [currBoardData, setCurrBoardData] = useState<BoardData>({
    height: BEGINNER_HEIGHT,
    width: BEGINNER_WIDTH,
    mines: BEGINNER_MINES,
    gameType: GameType.Beginner,
    marks: false,
  })

  const closeModal = (boardData?: BoardData) => {
    setModalIsOpen(false)
    boardData && setCurrBoardData(boardData)
  }

  const handleButtonClick = () => {
    setModalIsOpen(true)
  }

  useEffect(() => {
    const validMines = 
      currBoardData.mines < MIN_CUSTOM_MINES || currBoardData.mines > MAX_CUSTOM_MINES
        ? BEGINNER_MINES
        : currBoardData.mines
    
    setDimensions(currBoardData.width, currBoardData.height, validMines)
    setMarks(currBoardData.marks)
  }, [currBoardData, setDimensions, setMarks])

  return (
    <>
      <div className='header__container'>
        <Mines />
        <button
          className={`header__face ${faceClass}`}
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
})

export default Header
