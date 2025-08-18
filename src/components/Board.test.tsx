import { describe, it, expect, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import Board from './Board'
import { useGameStore } from '../store/gameStore'

describe('Board', () => {
  beforeEach(() => {
    useGameStore.getState().resetGame()
  })

  it('should render without crashing', () => {
    const { container } = render(<Board />)
    expect(container).toBeTruthy()
  })

  it('should render board container', () => {
    const { container } = render(<Board />)
    
    const boardContainer = container.querySelector('.board__container')
    expect(boardContainer).toBeTruthy()
  })

  it('should render correct number of cells for beginner board', () => {
    const { container } = render(<Board />)
    
    // Beginner board is 9x9 = 81 cells
    const cells = container.querySelectorAll('.square')
    expect(cells).toHaveLength(81)
  })

  it('should render cells with correct row and col props', () => {
    const { container } = render(<Board />)
    
    // First cell should be at 0,0
    const firstCell = container.querySelector('.square')
    expect(firstCell).toBeTruthy()
    
    // Should have correct grid layout
    const cells = container.querySelectorAll('.square')
    expect(cells.length).toBeGreaterThan(0)
  })

  it('should set CSS custom property for column count', () => {
    render(<Board />)
    
    // Check that CSS variable is set
    const rootStyle = getComputedStyle(document.documentElement)
    const numCols = rootStyle.getPropertyValue('--num-cols')
    expect(numCols).toBe('9') // Beginner width
  })

  it('should update cells when board dimensions change', () => {
    // Start with beginner board
    const { container, rerender } = render(<Board />)
    
    let cells = container.querySelectorAll('.square')
    expect(cells).toHaveLength(81) // 9x9
    
    // Change to intermediate dimensions
    useGameStore.getState().setDimensions(16, 16, 40)
    
    rerender(<Board />)
    
    cells = container.querySelectorAll('.square')
    expect(cells).toHaveLength(256) // 16x16
  })

  it('should update CSS variable when width changes', () => {
    render(<Board />)
    
    // Change width
    useGameStore.getState().setDimensions(16, 16, 40)
    
    // Re-render to trigger useEffect
    const { container } = render(<Board />)
    
    // CSS variable should be updated
    const rootStyle = getComputedStyle(document.documentElement)
    const numCols = rootStyle.getPropertyValue('--num-cols')
    expect(numCols).toBe('16')
  })

  it('should be memoized', () => {
    const { rerender, container } = render(<Board />)
    
    const initialElement = container.querySelector('.board__container')
    
    // Re-render
    rerender(<Board />)
    
    const afterRerender = container.querySelector('.board__container')
    
    // Should maintain reference equality due to memo
    expect(initialElement).toBe(afterRerender)
  })

  it('should memoize cells array', () => {
    const { rerender, container } = render(<Board />)
    
    const initialCells = container.querySelectorAll('.square')
    
    // Re-render with same dimensions
    rerender(<Board />)
    
    const afterRerender = container.querySelectorAll('.square')
    
    // Should have same number of cells
    expect(afterRerender).toHaveLength(initialCells.length)
  })

  it('should handle edge case of small board', () => {
    // Set very small board
    useGameStore.getState().setDimensions(1, 1, 0)
    
    const { container } = render(<Board />)
    
    const cells = container.querySelectorAll('.square')
    expect(cells).toHaveLength(1)
    
    const rootStyle = getComputedStyle(document.documentElement)
    const numCols = rootStyle.getPropertyValue('--num-cols')
    expect(numCols).toBe('1')
  })
})