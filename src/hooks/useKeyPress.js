// @flow
import { useEffect, useState } from 'react'

// Hook
function useKeyPress (targetKey: string, onPressUp: function = () => {}, onPressDown: function = () => {}): string {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false)

  // If pressed key is our target key then set to true
  function downHandler ({ key }: Object) {
    if (key === targetKey) {
      setKeyPressed(true)
      onPressDown()
    }
  }

  // If released key is our target key then set to false
  const upHandler = ({ key }: Object) => {
    if (key === targetKey) {
      setKeyPressed(false)
      onPressUp()
    }
  }

  // Add event listeners
  useEffect((): function => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return keyPressed
}

export default useKeyPress
