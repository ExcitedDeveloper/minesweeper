import Modal from 'react-modal'
import './Dialog.css'

type DialogProps = {
  modalIsOpen: boolean
  closeModal: () => void
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
  },
}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

const Dialog = ({ modalIsOpen, closeModal }: DialogProps) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Example Modal'
    >
      <form>
        <div className='dialog__content'>
          <div className='dialog__row dialog__title'>
            <span>Game</span>
          </div>
          <div className='dialog__row dialog__main dialog__col_headers'>
            <div className='flex2'></div>
            <div className='flex1'>
              <span>Height</span>
            </div>
            <div className='flex1'>
              <span>Width</span>
            </div>
            <div className='flex1'>
              <span>Mines</span>
            </div>
          </div>
          <div className='dialog__row dialog__main dialog__beginner'>
            <div className='flex2'>
              <div>
                <label>
                  <input
                    type='radio'
                    className='dialog__radio'
                    name='choice'
                    value='beginner'
                  />{' '}
                  Beginner
                </label>
              </div>
            </div>
            <div className='flex1'>
              <span>9</span>
            </div>
            <div className='flex1'>
              <span>9</span>
            </div>
            <div className='flex1'>
              <span>10</span>
            </div>
          </div>
          <div className='dialog__row dialog__main dialog__intermediate'>
            <div className='flex2'>
              <div>
                <label>
                  <input
                    type='radio'
                    className='dialog__radio'
                    name='choice'
                    value='intermediate'
                  />{' '}
                  Intermediate
                </label>
              </div>
            </div>
            <div className='flex1'>
              <span>16</span>
            </div>
            <div className='flex1'>
              <span>16</span>
            </div>
            <div className='flex1'>
              <span>40</span>
            </div>
          </div>
          <div className='dialog__row dialog__main dialog__expert'>
            <div className='flex2'>
              <div>
                <label>
                  <input
                    type='radio'
                    className='dialog__radio'
                    name='choice'
                    value='expert'
                  />{' '}
                  Expert
                </label>
              </div>
            </div>
            <div className='flex1'>
              <span>16</span>
            </div>
            <div className='flex1'>
              <span>30</span>
            </div>
            <div className='flex1'>
              <span>99</span>
            </div>
          </div>
          <div className='dialog__row dialog__main dialog__custom'>
            <div className='flex2'>
              <div>
                <label>
                  <input
                    type='radio'
                    className='dialog__radio'
                    name='choice'
                    value='custom'
                  />{' '}
                  Custom
                </label>
              </div>
            </div>
            <div className='flex1'>
              <input
                type='text'
                className='dialog__custom_input'
                id='customHeight'
                value={'20'}
              />
            </div>
            <div className='flex1'>
              <input
                type='text'
                className='dialog__custom_input'
                id='customWidth'
                value={'30'}
              />
            </div>
            <div className='flex1'>
              <input
                type='text'
                className='dialog__custom_input'
                id='customMines'
                value={'145'}
              />
            </div>
          </div>
          <div className='dialog__row dialog__main dialog__footer'>
            <div className='flex2'>
              <div className='dialog__new_game'>
                <button type='submit' className='dialog__new_game_btn'>
                  New Game
                </button>
              </div>
            </div>
            <div className='flex3 flex flex_center'>
              <label>
                <input
                  type='checkbox'
                  className='dialog__checkbox'
                  name='marks'
                />{' '}
                Marks (?)
              </label>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default Dialog
