import { ChangeEvent, useState, useEffect, useContext } from 'react'
import Modal from 'react-modal'
import './Dialog.css'
import { GameType, BoardData, GameStatus } from '../types/Game'
import {
  MIN_CUSTOM_MINES,
  MAX_CUSTOM_MINES,
  MIN_CUSTOM_HEIGHT,
  MAX_CUSTOM_HEIGHT,
  MIN_CUSTOM_WIDTH,
  MAX_CUSTOM_WIDTH,
  BEGINNER_HEIGHT,
  BEGINNER_WIDTH,
  BEGINNER_MINES,
  INTERMEDIATE_HEIGHT,
  INTERMEDIATE_WIDTH,
  INTERMEDIATE_MINES,
  EXPERT_HEIGHT,
  EXPERT_WIDTH,
  EXPERT_MINES,
  CUSTOM_HEIGHT,
  CUSTOM_WIDTH,
  CUSTOM_MINES,
} from '../constants'
import { GameContext } from '../GameContext'
import { createBoard } from '../util/board'

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

const defaultCustomValues = {
  height: '20',
  width: '30',
  mines: '145',
}

const _gameData: { [key in GameType]: GameData } = {
  [GameType.Beginner]: {
    height: BEGINNER_HEIGHT,
    width: BEGINNER_WIDTH,
    mines: BEGINNER_MINES,
  },
  [GameType.Intermediate]: {
    height: INTERMEDIATE_HEIGHT,
    width: INTERMEDIATE_WIDTH,
    mines: INTERMEDIATE_MINES,
  },
  [GameType.Expert]: {
    height: EXPERT_HEIGHT,
    width: EXPERT_WIDTH,
    mines: EXPERT_MINES,
  },
  [GameType.Custom]: {
    height: CUSTOM_HEIGHT,
    width: CUSTOM_WIDTH,
    mines: CUSTOM_MINES,
  },
}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

const Dialog = ({ modalIsOpen, closeModal, initBoardData }: DialogProps) => {
  const [gameType, setGameType] = useState<GameType>(GameType.Beginner)
  const [customHeight, setCustomHeight] = useState(defaultCustomValues.height)
  const [customWidth, setCustomWidth] = useState(defaultCustomValues.width)
  const [customMines, setCustomMines] = useState(defaultCustomValues.mines)
  const [marks, setMarks] = useState(false)
  const ctx = useContext(GameContext)
  const [, setBoard] = ctx.board
  const [, setGameStatus] = ctx.gameStatus
  const [, setWidth] = ctx.width
  const [, setHeight] = ctx.height
  const [, setMines] = ctx.mines

  useEffect(() => {
    setGameType(initBoardData.gameType)
    setMarks(initBoardData.marks)

    if (initBoardData.gameType === GameType.Custom) {
      setCustomHeight(initBoardData.height.toString())
      setCustomWidth(initBoardData.width.toString())
      setCustomMines(initBoardData.mines.toString())
    }
  }, [initBoardData])

  const onGameTypeChange = (e: ChangeEvent) => {
    const typeOfGame = (e.target as HTMLInputElement)
      .value as unknown as GameType
    setGameType(typeOfGame)
  }

  const validateCustomMines = () => {
    const numMines = Number(customMines)

    if (numMines < MIN_CUSTOM_MINES || numMines > MAX_CUSTOM_MINES) {
      setCustomMines(MIN_CUSTOM_MINES.toString())
      return MIN_CUSTOM_MINES
    }

    return Number(customMines)
  }

  const validateCustomWidth = () => {
    const numWidth = Number(customWidth)

    if (numWidth < MIN_CUSTOM_WIDTH || numWidth > MAX_CUSTOM_WIDTH) {
      setCustomWidth(MIN_CUSTOM_WIDTH.toString())
      return MIN_CUSTOM_WIDTH
    }

    return Number(customWidth)
  }

  const validateCustomHeight = () => {
    const numHeight = Number(customHeight)

    if (numHeight < MIN_CUSTOM_HEIGHT || numHeight > MAX_CUSTOM_HEIGHT) {
      setCustomHeight(MIN_CUSTOM_HEIGHT.toString())
      return MIN_CUSTOM_HEIGHT
    }

    return Number(customHeight)
  }

  const getBoardData = (): BoardData => {
    const validatedMines = validateCustomMines()
    const validatedHeight = validateCustomHeight()
    const validatedWidth = validateCustomWidth()

    if (gameType === GameType.Custom) {
      return {
        height: validatedHeight,
        width: validatedWidth,
        mines: validatedMines,
        gameType: GameType.Custom,
        marks,
      }
    } else {
      return { gameType, marks, ..._gameData[gameType] }
    }
  }

  const handleNewGame = () => {
    const boardData = getBoardData()

    closeModal({ ...boardData })

    const newBoard = createBoard(
      boardData.width,
      boardData.height,
      boardData.mines
    )

    setBoard(newBoard)

    setGameStatus(GameStatus.NewGame)

    setHeight(boardData.height)
    setWidth(boardData.width)
    setMines(boardData.mines)
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
              min={MIN_CUSTOM_HEIGHT}
              max={MAX_CUSTOM_HEIGHT}
              className='dialog__custom_input'
              id='customHeight'
              value={customHeight}
              onChange={(e) => setCustomHeight(e.target.value)}
            />
          </div>
          <div className='flex1'>
            <input
              type='number'
              inputMode='numeric'
              min={MIN_CUSTOM_WIDTH}
              max={MAX_CUSTOM_WIDTH}
              className='dialog__custom_input'
              id='customWidth'
              value={customWidth}
              onChange={(e) => setCustomWidth(e.target.value)}
            />
          </div>
          <div className='flex1'>
            <input
              type='number'
              inputMode='numeric'
              min={MIN_CUSTOM_MINES}
              max={MAX_CUSTOM_MINES}
              className='dialog__custom_input'
              id='customMines'
              value={customMines}
              onChange={(e) => setCustomMines(e.target.value)}
            />
          </div>
        </div>
        <div className='dialog__footer dialog__row dialog__main'>
          <div className='flex2'>
            <div className='dialog__new_game'>
              <button
                type='submit'
                className='dialog__new_game_btn'
                onClick={handleNewGame}
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
                checked={marks}
                onChange={(e) => setMarks(e.target.checked)}
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
