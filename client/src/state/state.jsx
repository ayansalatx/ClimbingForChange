import { createContext, useReducer, useContext } from "react";
import { reducer } from "state/reducer";

const initialState = {
  notification: null,
};

export const StateContext = createContext([
  initialState,
  () => initialState,
]);

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
