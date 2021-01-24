// @flow
import { useEffect, useState } from 'react'
import { getPageVisibility } from 'utils'
const { state: visibilityState, hidden, visibilityChange } = getPageVisibility()

const useVisible = (): Function => {
  const [state, setState] = useState({ hidden: document.hidden, visibilityState: document.visibilityState })

  const onVisibilityChangeEvent = (event: any) => {
    setState({
      hidden: document[hidden],
      visibilityState: document[visibilityState],
    })
  }

  useEffect((): Function => {
    document.addEventListener(visibilityChange, onVisibilityChangeEvent)

    return () => {
      document.removeEventListener(visibilityChange, onVisibilityChangeEvent)
    }
  }, [])

  return state
}

export default useVisible
