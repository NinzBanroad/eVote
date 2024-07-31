import {
  GET_ALL_CANDIDATES,
  GET_ALL_CANDIDATES_ERROR,
  CLEAR_PROFILE,
} from '../actions/types';

const initialState = {
  isAuthenticated: null,
  loading: true,
  candidates: [],
  error: {},
};

function candidateReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_CANDIDATES:
      return {
        ...state,
        candidates: payload,
        isAuthenticated: true,
        loading: false,
      };
    case GET_ALL_CANDIDATES_ERROR:
      return {
        ...state,
        error: payload,
        isAuthenticated: false,
        loading: false,
        candidates: null,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
      };
    default:
      return state;
  }
}

export default candidateReducer;
