/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useState, createRef } from 'react'
import './Header.css'
import smileyFace from '../assets/happiness.png'
// import sadFace from '../assets/sad.png'
import Dialog from './Dialog'

const Header = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const closeModal = () => {
    setModalIsOpen(false)
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
        top={dialogTop}
      />
    </>
  )
}

export default Header
