import { useCallback } from "react";
import { setAlert } from '../state/reducer';
import { useGlobalState } from "../state/state";

export const useAlert = () => {
  const [, dispatch] = useGlobalState();

  const displayAlert = useCallback(
    (title, message, type) => {

      setTimeout(() => {
        dispatch(
          setAlert({
            title,
            message,
            type,
          })
        );

        const id = setTimeout(() => {
          dispatch({ type: "SET_ALERT", payload: null });
        }, 5000);

        timerIdRef.current = id;
      }, 0);
    },
    [dispatch]
  );

  return displayAlert;
};
