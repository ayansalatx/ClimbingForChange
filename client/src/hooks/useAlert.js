import { useCallback, useRef } from 'react'

import { setAlert } from '../state/reducer'
import { useGlobalState } from '../state/state'

export const useAlert = () => {
  const [, dispatch] = useGlobalState()
  const timerIdRef = useRef(null)

  const displayAlert = useCallback(
    (title, message, type) => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current)
        timerIdRef.current = null
      }

      setTimeout(() => {
        dispatch(
          setAlert({
            title,
            message,
            type,
          })
        )

        const id =  setTimeout(() => {
          dispatch({ type: 'SET_ALERT', payload: null })
        }, 5000)

        timerIdRef.current = id
      }, 0)
    },
    [dispatch]
  )

  return displayAlert
}
