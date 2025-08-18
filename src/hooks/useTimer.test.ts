import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTimer } from './useTimer'
import { useGameStore } from '../store/gameStore'
import { INTERVAL_TIME, MAX_TIME } from '../constants'

describe('useTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    useGameStore.getState().resetGame()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should return initial timer state', () => {
    const { result } = renderHook(() => useTimer())
    
    expect(result.current.currentTime).toBe(0)
    expect(result.current.isTimerRunning).toBe(false)
  })

  it('should start timer when isTimerRunning becomes true', () => {
    const { result } = renderHook(() => useTimer())
    const setIntervalSpy = vi.spyOn(window, 'setInterval')
    
    act(() => {
      useGameStore.getState().startTimer()
    })
    
    expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), INTERVAL_TIME)
    expect(result.current.isTimerRunning).toBe(true)
  })

  it('should increment time when timer is running', () => {
    const { result } = renderHook(() => useTimer())
    
    act(() => {
      useGameStore.getState().startTimer()
    })
    
    // Fast forward time
    act(() => {
      vi.advanceTimersByTime(INTERVAL_TIME)
    })
    
    expect(result.current.currentTime).toBe(1)
    
    // Fast forward again
    act(() => {
      vi.advanceTimersByTime(INTERVAL_TIME)
    })
    
    expect(result.current.currentTime).toBe(2)
  })

  it('should stop timer when isTimerRunning becomes false', () => {
    const { result } = renderHook(() => useTimer())
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval')
    
    // Start timer first
    act(() => {
      useGameStore.getState().startTimer()
    })
    
    expect(result.current.isTimerRunning).toBe(true)
    
    // Stop timer
    act(() => {
      useGameStore.getState().stopTimer()
    })
    
    expect(clearIntervalSpy).toHaveBeenCalled()
    expect(result.current.isTimerRunning).toBe(false)
  })

  it('should stop timer when reaching MAX_TIME', () => {
    const { result } = renderHook(() => useTimer())
    
    // Set time close to max
    act(() => {
      useGameStore.getState().setCurrentTime(MAX_TIME - 1)
    })
    
    act(() => {
      useGameStore.getState().startTimer()
    })
    
    expect(result.current.isTimerRunning).toBe(true)
    
    // Advance time to trigger max time stop
    act(() => {
      vi.advanceTimersByTime(INTERVAL_TIME)
    })
    
    expect(result.current.isTimerRunning).toBe(false)
    expect(result.current.currentTime).toBe(MAX_TIME)
  })

  it('should clear interval on unmount', () => {
    const { unmount } = renderHook(() => useTimer())
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval')
    
    // Start timer
    act(() => {
      useGameStore.getState().startTimer()
    })
    
    unmount()
    
    expect(clearIntervalSpy).toHaveBeenCalled()
  })

  it('should handle timer state changes correctly', () => {
    const { result } = renderHook(() => useTimer())
    
    // Start timer
    act(() => {
      useGameStore.getState().startTimer()
    })
    
    expect(result.current.isTimerRunning).toBe(true)
    
    // Stop timer
    act(() => {
      useGameStore.getState().stopTimer()
    })
    
    expect(result.current.isTimerRunning).toBe(false)
    
    // Reset timer
    act(() => {
      useGameStore.getState().resetTimer()
    })
    
    expect(result.current.currentTime).toBe(0)
    expect(result.current.isTimerRunning).toBe(false)
  })

  it('should not create multiple intervals when timer is already running', () => {
    const { rerender } = renderHook(() => useTimer())
    const setIntervalSpy = vi.spyOn(window, 'setInterval')
    
    // Start timer
    act(() => {
      useGameStore.getState().startTimer()
    })
    
    const initialCallCount = setIntervalSpy.mock.calls.length
    
    // Trigger re-render
    rerender()
    
    // Should not create additional intervals
    expect(setIntervalSpy.mock.calls.length).toBe(initialCallCount)
  })

  it('should handle rapid start/stop correctly', () => {
    const { result } = renderHook(() => useTimer())
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval')
    const setIntervalSpy = vi.spyOn(window, 'setInterval')
    
    // Start timer first
    act(() => {
      useGameStore.getState().startTimer()
    })
    
    // Then stop and start again
    act(() => {
      useGameStore.getState().stopTimer()
    })
    
    act(() => {
      useGameStore.getState().startTimer()
    })
    
    expect(setIntervalSpy).toHaveBeenCalled()
    expect(clearIntervalSpy).toHaveBeenCalled()
    expect(result.current.isTimerRunning).toBe(true)
  })
})