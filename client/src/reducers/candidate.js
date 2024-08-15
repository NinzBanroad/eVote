import {
  GET_ALL_CANDIDATES,
  GET_ALL_CANDIDATES_ERROR,
  ADD_CANDIDATE_VOTE,
  ADD_CANDIDATE_VOTE_ERROR,
  GET_CANDIDATE_VOTE,
  GET_CANDIDATE_VOTE_ERROR,
  ADD_UPDATE_PLATFORM,
  ADD_UPDATE_PLATFORM_ERROR,
  DELETE_PLATFORM,
  DELETE_PLATFORM_ERROR,
  GET_PLATFORM,
  GET_PLATFORM_ERROR,
  GET_CURRENT_CANDIDATE,
  GET_CURRENT_CANDIDATE_ERROR,
} from '../actions/types';

const initialState = {
  votes: [],
  vote: null,
  platform: null,
  isAuthenticated: null,
  loading: true,
  candidates: [],
  hasvoted: null,
  error: {},
};

function candidateReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CURRENT_CANDIDATE:
      return {
        ...state,
        hasvoted: payload,
        loading: false,
      };
    case GET_CURRENT_CANDIDATE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
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
    case GET_PLATFORM:
      return {
        ...state,
        platform: payload,
        loading: false,
      };
    case GET_PLATFORM_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case ADD_UPDATE_PLATFORM:
      return {
        ...state,
        platform: payload,
        loading: false,
      };
    case ADD_UPDATE_PLATFORM_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case DELETE_PLATFORM:
      return {
        ...state,
        platform: payload,
        loading: false,
      };
    case DELETE_PLATFORM_ERROR:
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
