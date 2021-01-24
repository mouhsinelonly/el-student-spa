// @flow
import { useEffect, useRef } from 'react'

const useInterval = (callback: Function, delay: number) => {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect((): Function => {
    function tick () {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return (): Function => clearInterval(id)
    }
  }, [delay])
}

export default useInterval
