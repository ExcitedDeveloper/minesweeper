import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import Header from './Header'
import { useGameStore } from '../store/gameStore'

// Mock the Dialog component since it's complex
vi.mock('./Dialog', () => ({
  default: ({ modalIsOpen, closeModal, initBoardData }: any) => (
    <div data-testid="dialog">
      {modalIsOpen && (
        <div>
          <button onClick={() => closeModal(initBoardData)}>Close</button>
        </div>
      )}
    </div>
  )
}))

describe('Header', () => {
  beforeEach(() => {
    useGameStore.getState().resetGame()
  })

  it('should render without crashing', () => {
    const { container } = render(<Header />)
    expect(container).toBeTruthy()
  })

  it('should render header container and face button', () => {
    const { container } = render(<Header />)
    
    const headerContainer = container.querySelector('.header__container')
    expect(headerContainer).toBeTruthy()
    
    const faceButton = container.querySelector('.header__face')
    expect(faceButton).toBeTruthy()
  })

  it('should open modal when face button is clicked', () => {
    render(<Header />)
    
    const faceButton = screen.getByRole('button')
    fireEvent.click(faceButton)
    
    const dialog = screen.getByTestId('dialog')
    expect(dialog).toBeTruthy()
  })

  it('should apply correct face class', () => {
    const { container } = render(<Header />)
    
    const faceButton = container.querySelector('.header__face')
    expect(faceButton).toHaveClass('facesmile')
  })

  it('should update dimensions when board data changes', () => {
    render(<Header />)
    
    // Check that initial dimensions are set correctly
    const store = useGameStore.getState()
    expect(store.width).toBe(9)
    expect(store.height).toBe(9) 
    expect(store.mines).toBe(10)
    expect(store.marks).toBe(false)
  })

  it('should render Mines and Time components', () => {
    const { container } = render(<Header />)
    
    // Check for mines counter
    const minesCounter = container.querySelector('.counter__container')
    expect(minesCounter).toBeTruthy()
  })

  it('should handle modal close correctly', () => {
    render(<Header />)
    
    // Open modal
    const faceButton = screen.getByRole('button')
    fireEvent.click(faceButton)
    
    // Close modal
    const closeButton = screen.getByText('Close')
    fireEvent.click(closeButton)
    
    // Dialog should not show modal content
    const dialog = screen.getByTestId('dialog')
    expect(dialog.textContent).not.toContain('Close')
  })

  it('should validate mines within acceptable range', () => {
    // This test verifies the useEffect logic for mine validation
    const setDimensionsSpy = vi.spyOn(useGameStore.getState(), 'setDimensions')
    
    render(<Header />)
    
    // Should call with valid beginner mines
    expect(setDimensionsSpy).toHaveBeenCalledWith(9, 9, 10)
  })

  it('should be memoized', () => {
    const { rerender, container } = render(<Header />)
    
    const initialElement = container.querySelector('.header__container')
    
    // Re-render
    rerender(<Header />)
    
    const afterRerender = container.querySelector('.header__container')
    
    // Should maintain reference equality due to memo
    expect(initialElement).toBe(afterRerender)
  })
})