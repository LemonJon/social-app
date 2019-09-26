import {
  SET_SUBS,
  LIKE_SUB,
  UNLIKE_SUB,
  LOADING_DATA,
  DELETE_SUB,
  POST_SUB,
  SET_SUB,
  SUBMIT_COMMENT
} from "../types";

const initialState = {
  subs: [],
  sub: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_SUBS:
      return {
        ...state,
        subs: action.payload,
        loading: false
      };
    case SET_SUB:
      return {
        ...state,
        sub: action.payload
      };
    case LIKE_SUB:
    case UNLIKE_SUB:
      let index = state.subs.findIndex(
        sub => sub.subId === action.payload.subId
      );
      state.subs[index] = action.payload;
      if (state.sub.subId === action.payload.subId) {
        state.sub = action.payload;
      }
      return {
        ...state
      };
    case DELETE_SUB:
      index = state.subs.findIndex(sub => sub.subId === action.payload.subId);
      state.subs.splice(index, 1);
      return {
        ...state
      };
    case POST_SUB:
      return {
        ...state,
        subs: [action.payload, ...state.subs]
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        sub: {
          ...state.sub,
          comments: [action.payload, ...state.sub.comments]
        }
      };
    default:
      return state;
  }
}
