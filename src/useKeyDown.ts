import { useEffect } from 'react'

type KeyDownHandler = (event: KeyboardEvent) => void

const useKeyDown = (keyDownHandler: KeyDownHandler) => {
  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler)
    return () => {
      window.removeEventListener('keydown', keyDownHandler)
    }
  }, [])
}

export { useKeyDown }
