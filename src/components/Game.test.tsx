import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Game from './Game'

describe('Game', () => {
  it('should render without crashing', () => {
    const { container } = render(<Game />)
    expect(container).toBeTruthy()
  })

  it('should render the game container', () => {
    const { container } = render(<Game />)
    const gameContainer = container.querySelector('.game__container')
    expect(gameContainer).toBeTruthy()
  })

  it('should render Header and Board components', () => {
    const { container } = render(<Game />)
    
    // Check for header elements
    const headerContainer = container.querySelector('.header__container')
    expect(headerContainer).toBeTruthy()
    
    // Check for board elements
    const boardContainer = container.querySelector('.board__container')
    expect(boardContainer).toBeTruthy()
  })
})