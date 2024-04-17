import { ChangeEvent, useState, useEffect } from 'react'
import Modal from 'react-modal'
import './Dialog.css'

// eslint-disable-next-line react-refresh/only-export-components
export enum GameType {
  Beginner = 'beginner',
  Intermediate = 'intermediate',
  Expert = 'expert',
  Custom = 'custom',
}

export type BoardData = {
  gameType: GameType
  height: number
  width: number
  mines: number
  marks: boolean
}

type DialogProps = {
  modalIsOpen: boolean
  closeModal: (data?: BoardData) => void
  initBoardData: BoardData
}

const customStyles = {
  content: {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
  },
}

type GameData = {
  height: number
  width: number
  mines: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _gameData: { [key in GameType]: GameData } = {
  [GameType.Beginner]: {
    height: -9,
    width: 9,
    mines: 10,
  },
  [GameType.Intermediate]: {
    height: 16,
    width: 16,
    mines: 40,
  },
  [GameType.Expert]: {
    height: 16,
    width: 30,
    mines: 99,
  },
  [GameType.Custom]: {
    height: 9,
    width: 9,
    mines: 10,
  },
}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

const Dialog = ({ modalIsOpen, closeModal, initBoardData }: DialogProps) => {
  const [boardData, setBoardData] = useState<BoardData>(initBoardData)

  useEffect(() => {
    console.log(`boardData`, boardData)
  }, [boardData])

  const onGameTypeChange = (e: ChangeEvent) => {
    const typeOfGame = (e.target as HTMLInputElement).value as GameType
    setBoardData((prev) => ({
      ...prev,
      ..._gameData[typeOfGame],
      gameType: typeOfGame,
    }))
  }

  const onCustomGameTypeChange = () => {
    const height = Number(
      (document.getElementById('customHeight') as HTMLInputElement)?.value
    )
    const width = Number(
      (document.getElementById('customWidth') as HTMLInputElement)?.value
    )
    const mines = Number(
      (document.getElementById('customMines') as HTMLInputElement)?.value
    )
    setBoardData((prev) => ({
      height,
      width,
      mines,
      gameType: GameType.Custom,
      marks: prev.marks,
    }))
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => closeModal()}
      style={customStyles}
      contentLabel='Example Modal'
    >
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
                  value={GameType.Beginner}
                  checked={boardData.gameType === GameType.Beginner}
                  onChange={onGameTypeChange}
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
                  value={GameType.Intermediate}
                  checked={boardData.gameType === GameType.Intermediate}
                  onChange={onGameTypeChange}
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
                  value={GameType.Expert}
                  checked={boardData.gameType === GameType.Expert}
                  onChange={onGameTypeChange}
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
                  value={GameType.Custom}
                  checked={boardData.gameType === GameType.Custom}
                  onChange={onCustomGameTypeChange}
                />{' '}
                Custom
              </label>
            </div>
          </div>
          <div className='flex1'>
            <input
              type='number'
              inputMode='numeric'
              min={'5'}
              max={'50'}
              className='dialog__custom_input'
              id='customHeight'
              defaultValue={'20'}
            />
          </div>
          <div className='flex1'>
            <input
              type='number'
              inputMode='numeric'
              min={'5'}
              max={'50'}
              className='dialog__custom_input'
              id='customWidth'
              defaultValue={'30'}
            />
          </div>
          <div className='flex1'>
            <input
              type='number'
              inputMode='numeric'
              min={'5'}
              max={'200'}
              className='dialog__custom_input'
              id='customMines'
              defaultValue={'145'}
            />
          </div>
        </div>
        <div className='dialog__row dialog__main dialog__footer'>
          <div className='flex2'>
            <div className='dialog__new_game'>
              <button
                type='submit'
                className='dialog__new_game_btn'
                onClick={() => closeModal({ ...boardData })}
              >
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
                onChange={() =>
                  setBoardData((prev) => ({ ...prev, marks: !prev.marks }))
                }
              />{' '}
              Marks (?)
            </label>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default Dialog
