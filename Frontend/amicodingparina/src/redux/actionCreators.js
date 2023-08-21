import * as actionTypes from "./actionTypes";
import jwtDecode from "jwt-decode";
import axios from "axios";

export const authCheck = () => (dispatch) => {
  const url = window.location.pathname.split("/");

  if (url[1] === "authenticate") {
    axios
      .get(`http://127.0.0.1:8000/api/auth/authenticate/${url[2]}/${url[3]}/`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          dispatch(authDetails(response.data.token.access));
        }
      })
      .catch((err) => console.log(err));
  } else {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationTime = new Date(localStorage.getItem("expirationTime"));
      if (expirationTime <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authDetails(token));
      }
    }
  }
};

export const authDetails = (token) => (dispatch) => {
  const decoded = jwtDecode(token);

  const expTime = decoded.exp;
  const user_id = decoded.user_id;
  const expirationTime = new Date(expTime * 1000);

  localStorage.setItem("token", token);
  localStorage.setItem("userId", user_id);
  localStorage.setItem("expirationTime", expirationTime);

  dispatch({
    type: actionTypes.AUTH_DETAILS,
    payload: {
      token: token,
      userId: user_id,
    },
  });
};

export const loading = (payload) => ({
  type: actionTypes.LOADING,
  payload: payload,
});

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationTime");

  dispatch({
    type: actionTypes.LOGOUT,
  });
};
