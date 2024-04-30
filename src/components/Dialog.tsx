import { ChangeEvent, useState, useEffect } from 'react'
import Modal from 'react-modal'
import './Dialog.css'
import { GameType, BoardData } from '../types/Game'

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
    height: 9,
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
  const [gameType, setGameType] = useState<GameType>(GameType.Beginner)

  useEffect(() => {
    console.log(`initBoardData`, initBoardData)
    setGameType(initBoardData.gameType)

    if (initBoardData.gameType === GameType.Custom) {
      console.log(`setting custom initial data`)
      const customHeight = document.getElementById(
        'customHeight'
      ) as HTMLInputElement
      if (customHeight) {
        customHeight.value = initBoardData.height.toString()
      }

      const customWidth = document.getElementById(
        'customWidth'
      ) as HTMLInputElement
      if (customWidth) {
        customWidth.value = initBoardData.width.toString()
      }

      const customMines = document.getElementById(
        'customMines'
      ) as HTMLInputElement
      if (customMines) {
        customMines.value = initBoardData.mines.toString()
      }
    }
  }, [initBoardData])

  const onGameTypeChange = (e: ChangeEvent) => {
    const typeOfGame = (e.target as HTMLInputElement)
      .value as unknown as GameType
    setGameType(typeOfGame)
  }

  const getBoardData = (): BoardData => {
    const marks = Boolean(
      (document.getElementById('marks') as HTMLInputElement)?.value
    )

    if (gameType === GameType.Custom) {
      const height = Number(
        (document.getElementById('customHeight') as HTMLInputElement)?.value
      )
      const width = Number(
        (document.getElementById('customWidth') as HTMLInputElement)?.value
      )
      const mines = Number(
        (document.getElementById('customMines') as HTMLInputElement)?.value
      )
      return {
        height,
        width,
        mines,
        gameType: GameType.Custom,
        marks,
      }
    } else {
      return { gameType, marks, ..._gameData[gameType] }
    }
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
                  checked={gameType === GameType.Beginner}
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
                  checked={gameType === GameType.Intermediate}
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
                  checked={gameType === GameType.Expert}
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
                  checked={gameType === GameType.Custom}
                  onChange={onGameTypeChange}
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
        <div className='dialog__footer dialog__row dialog__main'>
          <div className='flex2'>
            <div className='dialog__new_game'>
              <button
                type='submit'
                className='dialog__new_game_btn'
                onClick={() => closeModal({ ...getBoardData() })}
              >
                New Game
              </button>
            </div>
          </div>
          <div className='flex3 flex flex_center'>
            <label>
              <input
                id='marks'
                type='checkbox'
                className='dialog__checkbox'
                name='marks'
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
