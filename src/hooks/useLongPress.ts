import { SyntheticEvent, useMemo, useRef } from 'react'

const isTouchEvent = (event: SyntheticEvent) => {
  return window.TouchEvent
    ? event.nativeEvent instanceof TouchEvent
    : 'touches' in event.nativeEvent
}

const isMouseEvent = (event: SyntheticEvent) => {
  return event.nativeEvent instanceof MouseEvent
}

export type CallBackEvent = (event: SyntheticEvent) => void

export const emptyCallback = () => {}

export type UseLongPressOptions = {
  threshold?: number
  onStart?: CallBackEvent
  onFinish?: CallBackEvent
  onCancel?: CallBackEvent
}

const useLongPress = (
  callback: CallBackEvent,
  options: UseLongPressOptions = {}
) => {
  const {
    threshold = 400,
    onStart = emptyCallback,
    onFinish = emptyCallback,
    onCancel = emptyCallback,
  } = options
  const isLongPressActive = useRef(false)
  const isPressed = useRef(false)
  const timerId = useRef(0)

  return useMemo(() => {
    if (typeof callback !== 'function') {
      return {}
    }

    const start = (event: SyntheticEvent) => {
      if (!isMouseEvent(event) && !isTouchEvent(event)) return

      if (onStart) {
        onStart(event)
      }

      isPressed.current = true
      timerId.current = setTimeout(() => {
        callback(event)
        isLongPressActive.current = true
      }, threshold)
    }

    const cancel = (event: SyntheticEvent) => {
      if (!isMouseEvent(event) && !isTouchEvent(event)) return

      if (isLongPressActive.current) {
        if (onFinish) {
          onFinish(event)
        }
      } else if (isPressed.current) {
        if (onCancel) {
          onCancel(event)
        }
      }

      isLongPressActive.current = false
      isPressed.current = false

      if (timerId.current) {
        window.clearTimeout(timerId.current)
      }
    }

    const mouseHandlers = {
      onMouseDown: start,
      onMouseUp: cancel,
      onMouseLeave: cancel,
    }

    const touchHandlers = {
      onTouchStart: start,
      onTouchEnd: cancel,
    }

    return {
      ...mouseHandlers,
      ...touchHandlers,
    }
  }, [callback, threshold, onCancel, onFinish, onStart])
}

export default useLongPress
