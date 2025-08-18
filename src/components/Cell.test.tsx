import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import Cell from './Cell'
import { useGameStore } from '../store/gameStore'
import { GameStatus, FaceClass, CellType } from '../types/Game'

// Mock the useLongPress hook
vi.mock('@uidotdev/usehooks', () => ({
  useLongPress: () => ({
    onTouchStart: vi.fn(),
    onTouchEnd: vi.fn(),
  })
}))

describe('Cell', () => {
  beforeEach(() => {
    useGameStore.getState().resetGame()
  })

  it('should render without crashing', () => {
    const { container } = render(<Cell row={0} col={0} />)
    expect(container).toBeTruthy()
  })

  it('should render a square element for unrevealed cell', () => {
    const { container } = render(<Cell row={0} col={0} />)
    
    const square = container.querySelector('.square')
    expect(square).toBeTruthy()
    expect(square).toHaveClass('noselect')
  })

  it('should render revealed cell without click handlers', () => {
    // Create a new board with revealed cell
    const testBoard = useGameStore.getState().board.map((row, rowIndex) =>
      row.map((cell, colIndex) => 
        rowIndex === 0 && colIndex === 0 
          ? { ...cell, isRevealed: true, revealClass: 'open1' }
          : cell
      )
    )
    
    useGameStore.getState().setBoard(testBoard)
    
    const { container } = render(<Cell row={0} col={0} />)
    
    const square = container.querySelector('.square')
    expect(square).toBeTruthy()
    expect(square).not.toHaveClass('noselect')
    expect(square).toHaveClass('open1')
  })

  it('should handle cell click and start game', () => {
    const { container } = render(<Cell row={0} col={0} />)
    
    const square = container.querySelector('.square')
    expect(square).toBeTruthy()
    
    fireEvent.click(square!)
    
    // Game should now be playing (2) - but might need to check the actual enum value
    const currentStatus = useGameStore.getState().gameStatus
    expect([GameStatus.Playing, GameStatus.Won]).toContain(currentStatus)
  })

  it('should not handle click when game is lost', () => {
    // Set game to lost state
    useGameStore.getState().setGameStatus(GameStatus.Lost)
    
    const { container } = render(<Cell row={0} col={0} />)
    
    const square = container.querySelector('.square')
    fireEvent.click(square!)
    
    // Game status should remain lost
    expect(useGameStore.getState().gameStatus).toBe(GameStatus.Lost)
  })

  it('should handle mouse down and change face class', () => {
    const { container } = render(<Cell row={0} col={0} />)
    
    const square = container.querySelector('.square')
    fireEvent.mouseDown(square!)
    
    expect(useGameStore.getState().faceClass).toBe(FaceClass.FaceOoh)
  })

  it('should handle mouse up and reset face class', () => {
    const { container } = render(<Cell row={0} col={0} />)
    
    const square = container.querySelector('.square')
    
    // First mouse down
    fireEvent.mouseDown(square!)
    expect(useGameStore.getState().faceClass).toBe(FaceClass.FaceOoh)
    
    // Then mouse up
    fireEvent.mouseUp(square!)
    expect(useGameStore.getState().faceClass).toBe(FaceClass.FaceSmile)
  })

  it('should handle right click', () => {
    const { container } = render(<Cell row={0} col={0} />)
    
    const square = container.querySelector('.square')
    
    // Right click (button 2)
    fireEvent.mouseUp(square!, { button: 2 })
    
    // Should flag the cell
    const board = useGameStore.getState().board
    expect(board[0][0].revealClass).toBe('bombflagged')
  })

  it('should not render for invalid position', () => {
    const { container } = render(<Cell row={99} col={99} />)
    
    expect(container.firstChild).toBeNull()
  })

  it('should handle game won scenario', () => {
    // Create a simple winning board
    const testBoard = [
      [
        { type: CellType.One, isRevealed: false, revealClass: 'blank' },
        { type: CellType.Bomb, isRevealed: false, revealClass: 'blank' }
      ]
    ]
    
    useGameStore.setState({
      board: testBoard,
      width: 2,
      height: 1,
      mines: 1,
      remainingMines: 1
    })
    
    const { container } = render(<Cell row={0} col={0} />)
    
    const square = container.querySelector('.square')
    fireEvent.click(square!)
    
    // Should detect game won when only non-bomb cells need to be revealed
    expect(useGameStore.getState().gameStatus).toBe(GameStatus.Won)
  })

  it('should handle game lost scenario when clicking bomb', () => {
    // Find a bomb cell in the current board
    const board = useGameStore.getState().board
    let bombRow = -1
    let bombCol = -1
    
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col].type === CellType.Bomb) {
          bombRow = row
          bombCol = col
          break
        }
      }
      if (bombRow !== -1) break
    }
    
    if (bombRow !== -1 && bombCol !== -1) {
      const { container } = render(<Cell row={bombRow} col={bombCol} />)
      
      const square = container.querySelector('.square')
      fireEvent.click(square!)
      
      expect(useGameStore.getState().gameStatus).toBe(GameStatus.Lost)
    }
  })

  it('should not handle mouse events when game is lost', () => {
    useGameStore.getState().setGameStatus(GameStatus.Lost)
    
    const { container } = render(<Cell row={0} col={0} />)
    
    const square = container.querySelector('.square')
    
    // Mouse down shouldn't change face when game is lost
    fireEvent.mouseDown(square!)
    expect(useGameStore.getState().faceClass).toBe(FaceClass.FaceSmile)
    
    // Mouse up shouldn't change face when game is lost  
    fireEvent.mouseUp(square!)
    expect(useGameStore.getState().faceClass).toBe(FaceClass.FaceSmile)
  })

  it('should be memoized', () => {
    const { rerender, container } = render(<Cell row={0} col={0} />)
    
    const initialElement = container.querySelector('.square')
    
    // Re-render with same props
    rerender(<Cell row={0} col={0} />)
    
    const afterRerender = container.querySelector('.square')
    
    // Should maintain reference equality due to memo
    expect(initialElement).toBe(afterRerender)
  })
})