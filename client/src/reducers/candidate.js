import {
  GET_ALL_CANDIDATES,
  GET_ALL_CANDIDATES_ERROR,
  ADD_CANDIDATE_VOTE,
  ADD_CANDIDATE_VOTE_ERROR,
  GET_CANDIDATE_VOTE,
  GET_CANDIDATE_VOTE_ERROR,
} from '../actions/types';

const initialState = {
  votes: [],
  vote: null,
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
    case ADD_CANDIDATE_VOTE:
      return {
        ...state,
        loading: false,
      };
    case ADD_CANDIDATE_VOTE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_CANDIDATE_VOTE:
      return {
        ...state,
        vote: payload,
        loading: false,
      };
    case GET_CANDIDATE_VOTE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default candidateReducer;
