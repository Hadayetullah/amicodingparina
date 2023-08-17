import * as actionTypes from "./actionTypes";
const authState = {
  token: null,
  userId: null,
  isAuthenticated: null,
};

const Reducer = (state = authState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_DETAILS:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        isAuthenticated: true,
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default Reducer;
