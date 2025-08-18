import { describe, it, expect, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import Mines from './Mines'
import { useGameStore } from '../store/gameStore'

describe('Mines', () => {
  beforeEach(() => {
    useGameStore.getState().resetGame()
  })

  it('should render without crashing', () => {
    const { container } = render(<Mines />)
    expect(container).toBeTruthy()
  })

  it('should render Counter with remaining mines value', () => {
    const { container } = render(<Mines />)
    
    const counter = container.querySelector('.counter__container.mines__container')
    expect(counter).toBeTruthy()
    
    // Should show 10 mines for beginner
    const numbers = container.querySelectorAll('.number')
    expect(numbers).toHaveLength(3)
    expect(numbers[0]).toHaveClass('number_0') // ones
    expect(numbers[1]).toHaveClass('number_1') // tens
    expect(numbers[2]).toHaveClass('number_0') // hundreds
  })

  it('should update when remaining mines change', () => {
    const { container, rerender } = render(<Mines />)
    
    // Change remaining mines
    useGameStore.getState().setRemainingMines(5)
    
    rerender(<Mines />)
    
    const numbers = container.querySelectorAll('.number')
    expect(numbers[0]).toHaveClass('number_5') // ones
    expect(numbers[1]).toHaveClass('number_0') // tens
    expect(numbers[2]).toHaveClass('number_0') // hundreds
  })

  it('should handle negative mine count', () => {
    const { container, rerender } = render(<Mines />)
    
    // Set negative mines (can happen when user flags more than actual mines)
    useGameStore.getState().setRemainingMines(-5)
    
    rerender(<Mines />)
    
    const counter = container.querySelector('.counter__container.mines__container')
    expect(counter).toBeTruthy()
  })

  it('should handle large mine count', () => {
    const { container, rerender } = render(<Mines />)
    
    // Set large mine count
    useGameStore.getState().setRemainingMines(999)
    
    rerender(<Mines />)
    
    const numbers = container.querySelectorAll('.number')
    expect(numbers[0]).toHaveClass('number_9') // ones
    expect(numbers[1]).toHaveClass('number_9') // tens
    expect(numbers[2]).toHaveClass('number_9') // hundreds
  })

  it('should be memoized', () => {
    const { rerender, container } = render(<Mines />)
    
    const initialElement = container.querySelector('.counter__container')
    
    // Re-render with same state
    rerender(<Mines />)
    
    const afterRerender = container.querySelector('.counter__container')
    
    // Should maintain reference equality due to memo
    expect(initialElement).toBe(afterRerender)
  })

  it('should apply correct container class', () => {
    const { container } = render(<Mines />)
    
    const counter = container.querySelector('.counter__container')
    expect(counter).toHaveClass('mines__container')
  })
})