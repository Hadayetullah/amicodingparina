import * as actionTypes from "./actionTypes";
const authState = {
  token: null,
  userId: null,
  isAuthenticated: null,
  isLoding: true,
};

const Reducer = (state = authState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_DETAILS:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        isAuthenticated: true,
        isLoding: false,
      };

    case actionTypes.LOADING:
      return {
        ...state,
        isLoding: action.payload,
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
        isAuthenticated: false,
        isLoding: false,
      };
    default:
      return state;
  }
};

export default Reducer;
