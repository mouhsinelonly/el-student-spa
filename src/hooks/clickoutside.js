// @flow
import * as React from 'react'

type RefObjectType = {|
  current: any
|};

function useClickOutside (forwardRef: RefObjectType, close: Function): boolean {
  const [clickedOutside, setClickedOutside] = React.useState(false)

  React.useEffect((): Function => {
    function handleClickOutside (e: Object) {
      if (forwardRef.current !== null) {
        if (!forwardRef.current.contains(e.target)) {
          setClickedOutside(forwardRef.current.contains(e.target))
          close()
        }
      }
    }
    document && document.addEventListener('mousedown', handleClickOutside, false)
    return () => {
      document && document.removeEventListener('mousedown', handleClickOutside, false)
    }
  })

  return clickedOutside
}

export default useClickOutside
