import {
  SET_SUBS,
  LOADING_DATA,
  LIKE_SUB,
  UNLIKE_SUB,
  DELETE_SUB,
  SET_ERRORS,
  POST_SUB,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_SUB,
  STOP_LOADING_UI,
  SUBMIT_COMMENT
} from "../types";
import axios from "axios";

// Get all subs
export const getSubs = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/subs")
    .then(res => {
      dispatch({
        type: SET_SUBS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_SUBS,
        payload: []
      });
    });
};
// Get one sub
export const getSub = subId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/sub/${subId}`)
    .then(res => {
      dispatch({
        type: SET_SUB,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};
// Post a sub
export const postSub = newSub => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/sub", newSub)
    .then(res => {
      dispatch({
        type: POST_SUB,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
// Like a sub
export const likeSub = subId => dispatch => {
  axios
    .get(`/sub/${subId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_SUB,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
// Unlike a sub
export const unlikeSub = subId => dispatch => {
  axios
    .get(`/sub/${subId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_SUB,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
// Submit a comment
export const submitComment = (subId, commentData) => dispatch => {
  axios
    .post(`/sub/${subId}/comment`, commentData)
    .then(res => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
// Delete sub
export const deleteSub = subId => dispatch => {
  axios
    .delete(`/sub/${subId}`)
    .then(() => {
      dispatch({ type: DELETE_SUB, payload: subId });
    })
    .catch(err => console.log(err));
};
// Get data from user
export const getUserData = userName => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userName}`)
    .then(res => {
      dispatch({
        type: SET_SUBS,
        payload: res.data.subs
      });
    })
    .catch(() => {
      dispatch({
        type: SET_SUBS,
        payload: null
      });
    });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
