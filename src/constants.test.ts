import { describe, it, expect } from 'vitest'
import {
  MIN_CUSTOM_MINES,
  MAX_CUSTOM_MINES,
  MIN_CUSTOM_HEIGHT,
  MAX_CUSTOM_HEIGHT,
  MIN_CUSTOM_WIDTH,
  MAX_CUSTOM_WIDTH,
  MIN_TIME,
  MAX_TIME,
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
  INTERVAL_TIME,
} from './constants'

describe('constants', () => {
  describe('custom game limits', () => {
    it('should have correct mine limits', () => {
      expect(MIN_CUSTOM_MINES).toBe(5)
      expect(MAX_CUSTOM_MINES).toBe(200)
    })

    it('should have correct height limits', () => {
      expect(MIN_CUSTOM_HEIGHT).toBe(9)
      expect(MAX_CUSTOM_HEIGHT).toBe(50)
    })

    it('should have correct width limits', () => {
      expect(MIN_CUSTOM_WIDTH).toBe(9)
      expect(MAX_CUSTOM_WIDTH).toBe(50)
    })
  })

  describe('time constants', () => {
    it('should have correct time limits', () => {
      expect(MIN_TIME).toBe(0)
      expect(MAX_TIME).toBe(999)
    })

    it('should have correct interval time', () => {
      expect(INTERVAL_TIME).toBe(1000)
    })
  })

  describe('difficulty presets', () => {
    it('should have correct beginner settings', () => {
      expect(BEGINNER_HEIGHT).toBe(9)
      expect(BEGINNER_WIDTH).toBe(9)
      expect(BEGINNER_MINES).toBe(10)
    })

    it('should have correct intermediate settings', () => {
      expect(INTERMEDIATE_HEIGHT).toBe(16)
      expect(INTERMEDIATE_WIDTH).toBe(16)
      expect(INTERMEDIATE_MINES).toBe(40)
    })

    it('should have correct expert settings', () => {
      expect(EXPERT_HEIGHT).toBe(16)
      expect(EXPERT_WIDTH).toBe(30)
      expect(EXPERT_MINES).toBe(99)
    })

    it('should have correct custom default settings', () => {
      expect(CUSTOM_HEIGHT).toBe(9)
      expect(CUSTOM_WIDTH).toBe(9)
      expect(CUSTOM_MINES).toBe(10)
    })
  })

  describe('value relationships', () => {
    it('should have logical mine limits', () => {
      expect(MIN_CUSTOM_MINES).toBeLessThan(MAX_CUSTOM_MINES)
    })

    it('should have logical dimension limits', () => {
      expect(MIN_CUSTOM_HEIGHT).toBeLessThan(MAX_CUSTOM_HEIGHT)
      expect(MIN_CUSTOM_WIDTH).toBeLessThan(MAX_CUSTOM_WIDTH)
    })

    it('should have logical time limits', () => {
      expect(MIN_TIME).toBeLessThan(MAX_TIME)
    })

    it('should have positive interval time', () => {
      expect(INTERVAL_TIME).toBeGreaterThan(0)
    })
  })

  describe('difficulty progression', () => {
    it('should have increasing mine counts', () => {
      expect(BEGINNER_MINES).toBeLessThan(INTERMEDIATE_MINES)
      expect(INTERMEDIATE_MINES).toBeLessThan(EXPERT_MINES)
    })

    it('should have increasing board sizes', () => {
      const beginnerCells = BEGINNER_HEIGHT * BEGINNER_WIDTH
      const intermediateCells = INTERMEDIATE_HEIGHT * INTERMEDIATE_WIDTH
      const expertCells = EXPERT_HEIGHT * EXPERT_WIDTH
      
      expect(beginnerCells).toBeLessThan(intermediateCells)
      expect(intermediateCells).toBeLessThan(expertCells)
    })

    it('should have reasonable mine density', () => {
      // Check that mine density isn't too high
      const beginnerDensity = BEGINNER_MINES / (BEGINNER_HEIGHT * BEGINNER_WIDTH)
      const intermediateDensity = INTERMEDIATE_MINES / (INTERMEDIATE_HEIGHT * INTERMEDIATE_WIDTH)
      const expertDensity = EXPERT_MINES / (EXPERT_HEIGHT * EXPERT_WIDTH)
      
      expect(beginnerDensity).toBeLessThan(0.5) // Less than 50% mines
      expect(intermediateDensity).toBeLessThan(0.5)
      expect(expertDensity).toBeLessThan(0.5)
    })
  })
})