import { useReducer } from 'react'

import { reducer } from './reducer'
import { StateContext } from './stateContext'

const initialState = {
  alert: null,
}

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  )
}
