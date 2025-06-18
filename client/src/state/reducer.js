
export const setNotification = (notification) => {
  return { type: "SET_NOTIFICATION", payload: notification };
};

export const reducer = (state, action) => {
  switch (action.type) {

    case "SET_NOTIFICATION":
      return { ...state, alert: action.payload };

    default:
      return state;
  }
};
