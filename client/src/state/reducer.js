
export const setAlert = (alert) => {
    return { type: "SET_ALERT", payload: alert };
};

export const reducer = (state, action) => {
    switch (action.type) {

        case "SET_ALERT":
            return { ...state, alert: action.payload };

        default:
            return state;
    }
};
