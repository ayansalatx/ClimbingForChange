// import { createContext, useContext,useReducer } from 'react'

// import { reducer } from './reducer'

// const initialState = {
//   alert: null,
// }

// export const StateContext = createContext([
//   initialState,
//   () => initialState,
// ])

// export const StateProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState)

//   return (
//     <StateContext.Provider value={[state, dispatch]}>
//       {children}
//     </StateContext.Provider>
//   )
// }

// export const useGlobalState = () => useContext(StateContext)
