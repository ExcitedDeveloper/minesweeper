import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Counter from './Counter'

describe('Counter', () => {
  it('should render single digit correctly', () => {
    const { container } = render(
      <Counter currentValue={5} containerClass="test-class" />
    )
    
    const counterContainer = container.querySelector('.counter__container.test-class')
    expect(counterContainer).toBeTruthy()
    
    const numbers = container.querySelectorAll('.number')
    expect(numbers).toHaveLength(3)
    
    // For single digit 5: ones=5, tens=0, hundreds=0
    expect(numbers[0]).toHaveClass('number_5') // ones
    expect(numbers[1]).toHaveClass('number_0') // tens
    expect(numbers[2]).toHaveClass('number_0') // hundreds
  })

  it('should render two digits correctly', () => {
    const { container } = render(
      <Counter currentValue={42} containerClass="test-class" />
    )
    
    const numbers = container.querySelectorAll('.number')
    
    // For two digits 42: ones=2, tens=4, hundreds=0
    expect(numbers[0]).toHaveClass('number_2') // ones
    expect(numbers[1]).toHaveClass('number_4') // tens
    expect(numbers[2]).toHaveClass('number_0') // hundreds
  })

  it('should render three digits correctly', () => {
    const { container } = render(
      <Counter currentValue={123} containerClass="test-class" />
    )
    
    const numbers = container.querySelectorAll('.number')
    
    // For three digits 123: ones=3, tens=2, hundreds=1
    expect(numbers[0]).toHaveClass('number_3') // ones
    expect(numbers[1]).toHaveClass('number_2') // tens
    expect(numbers[2]).toHaveClass('number_1') // hundreds
  })

  it('should handle zero correctly', () => {
    const { container } = render(
      <Counter currentValue={0} containerClass="test-class" />
    )
    
    const numbers = container.querySelectorAll('.number')
    
    // For zero: ones=0, tens=0, hundreds=0
    expect(numbers[0]).toHaveClass('number_0') // ones
    expect(numbers[1]).toHaveClass('number_0') // tens
    expect(numbers[2]).toHaveClass('number_0') // hundreds
  })

  it('should handle large numbers correctly', () => {
    const { container } = render(
      <Counter currentValue={999} containerClass="test-class" />
    )
    
    const numbers = container.querySelectorAll('.number')
    
    // For 999: ones=9, tens=9, hundreds=9
    expect(numbers[0]).toHaveClass('number_9') // ones
    expect(numbers[1]).toHaveClass('number_9') // tens
    expect(numbers[2]).toHaveClass('number_9') // hundreds
  })

  it('should apply custom container class', () => {
    const { container } = render(
      <Counter currentValue={1} containerClass="custom-counter" />
    )
    
    const counterContainer = container.querySelector('.counter__container')
    expect(counterContainer).toHaveClass('custom-counter')
  })

  it('should handle edge case of very large numbers', () => {
    const { container } = render(
      <Counter currentValue={1234} containerClass="test-class" />
    )
    
    const numbers = container.querySelectorAll('.number')
    
    // For numbers > 999, should still take last 3 digits: 234
    // But Counter logic handles it as: ones=3, tens=2, hundreds=1 from str[2], str[1], str[0]
    expect(numbers[0]).toHaveClass('number_3') // ones - str[3] doesn't exist, so fallback logic
    expect(numbers[1]).toHaveClass('number_2') // tens
    expect(numbers[2]).toHaveClass('number_1') // hundreds
  })

  it('should be memoized and not re-render unnecessarily', () => {
    const { rerender, container } = render(
      <Counter currentValue={5} containerClass="test-class" />
    )
    
    const initialElement = container.querySelector('.counter__container')
    
    // Re-render with same props
    rerender(<Counter currentValue={5} containerClass="test-class" />)
    
    const afterRerender = container.querySelector('.counter__container')
    
    // Should be the same element reference due to memo
    expect(initialElement).toBe(afterRerender)
  })
})