/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import './Header.css'
// import smileyFace from '../assets/icons8-smiley-face-48.png'
import smileyFace from '../assets/happiness.png'
// import sadFace from '../assets/sad.png'

const Header = () => {
  return (
    <div className='header__container'>
      <div className='header__smiley'>
        <img src={smileyFace} alt='Happy' />
      </div>
    </div>
  )
}

export default Header
