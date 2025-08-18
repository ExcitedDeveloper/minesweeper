import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import Time from './Time'
import { useGameStore } from '../store/gameStore'

describe('Time', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    useGameStore.getState().resetGame()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should render without crashing', () => {
    const { container } = render(<Time />)
    expect(container).toBeTruthy()
  })

  it('should render Counter with current time value', () => {
    const { container } = render(<Time />)
    
    const counter = container.querySelector('.counter__container.time__container')
    expect(counter).toBeTruthy()
    
    // Should show 0 time initially
    const numbers = container.querySelectorAll('.number')
    expect(numbers).toHaveLength(3)
    expect(numbers[0]).toHaveClass('number_0') // ones
    expect(numbers[1]).toHaveClass('number_0') // tens
    expect(numbers[2]).toHaveClass('number_0') // hundreds
  })

  it('should update when time changes', () => {
    const { container, rerender } = render(<Time />)
    
    // Change current time
    useGameStore.getState().setCurrentTime(25)
    
    rerender(<Time />)
    
    const numbers = container.querySelectorAll('.number')
    expect(numbers[0]).toHaveClass('number_5') // ones
    expect(numbers[1]).toHaveClass('number_2') // tens
    expect(numbers[2]).toHaveClass('number_0') // hundreds
  })

  it('should handle large time values', () => {
    const { container, rerender } = render(<Time />)
    
    // Set large time value
    useGameStore.getState().setCurrentTime(999)
    
    rerender(<Time />)
    
    const numbers = container.querySelectorAll('.number')
    expect(numbers[0]).toHaveClass('number_9') // ones
    expect(numbers[1]).toHaveClass('number_9') // tens
    expect(numbers[2]).toHaveClass('number_9') // hundreds
  })

  it('should handle three digit time values', () => {
    const { container, rerender } = render(<Time />)
    
    // Set three digit time
    useGameStore.getState().setCurrentTime(123)
    
    rerender(<Time />)
    
    const numbers = container.querySelectorAll('.number')
    expect(numbers[0]).toHaveClass('number_3') // ones
    expect(numbers[1]).toHaveClass('number_2') // tens
    expect(numbers[2]).toHaveClass('number_1') // hundreds
  })

  it('should be memoized', () => {
    const { rerender, container } = render(<Time />)
    
    const initialElement = container.querySelector('.counter__container')
    
    // Re-render with same state
    rerender(<Time />)
    
    const afterRerender = container.querySelector('.counter__container')
    
    // Should maintain reference equality due to memo
    expect(initialElement).toBe(afterRerender)
  })

  it('should apply correct container class', () => {
    const { container } = render(<Time />)
    
    const counter = container.querySelector('.counter__container')
    expect(counter).toHaveClass('time__container')
  })

  it('should reflect timer hook state changes', () => {
    const { container, rerender } = render(<Time />)
    
    // Start timer to see time changes
    useGameStore.getState().startTimer()
    
    // Fast forward time
    vi.advanceTimersByTime(1000)
    
    rerender(<Time />)
    
    // Time should have incremented
    const numbers = container.querySelectorAll('.number')
    expect(numbers[0]).toHaveClass('number_1') // ones should be 1
  })
})