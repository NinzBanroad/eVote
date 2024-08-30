import {
  GET_ALL_CANDIDATES_FROM_ADMIN,
  GET_ALL_CANDIDATES_FROM_ADMIN_ERROR,
  GET_ALL_USERS_FROM_ADMIN,
  GET_ALL_USERS_FROM_ADMIN_ERROR,
  ADD_CANDIDATE,
  ADD_CANDIDATE_ERROR,
  ADD_USER,
  ADD_USER_ERROR,
  DELETE_USER,
  DELETE_USER_ERROR,
  DELETE_CANDIDATE,
  DELETE_CANDIDATE_ERROR,
  UPDATE_USER,
  UPDATE_USER_ERROR,
  UPDATE_CANDIDATE,
  UPDATE_CANDIDATE_ERROR,
} from '../actions/types';

const initialState = {
  candidates: [],
  candidate: null,
  users: [],
  user: null,
  loading: true,
  error: {},
};

function adminReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_CANDIDATES_FROM_ADMIN:
      return {
        ...state,
        candidates: payload,
        isAuthenticated: true,
        loading: false,
      };
    case GET_ALL_CANDIDATES_FROM_ADMIN_ERROR:
      return {
        ...state,
        error: payload,
        isAuthenticated: false,
        loading: false,
        candidates: null,
      };
    case GET_ALL_USERS_FROM_ADMIN:
      return {
        ...state,
        users: payload,
        isAuthenticated: true,
        loading: false,
      };
    case GET_ALL_USERS_FROM_ADMIN_ERROR:
      return {
        ...state,
        error: payload,
        isAuthenticated: false,
        loading: false,
        users: null,
      };
    case ADD_CANDIDATE:
      return {
        ...state,
        candidates: [payload, ...state.candidates],
        loading: false,
      };
    case ADD_CANDIDATE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case ADD_USER:
      return {
        ...state,
        users: [payload, ...state.users],
        loading: false,
      };
    case ADD_USER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== payload),
        loading: false,
      };
    case DELETE_USER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case DELETE_CANDIDATE:
      return {
        ...state,
        candidates: state.candidates.filter(
          (candidate) => candidate._id !== payload
        ),
        loading: false,
      };
    case DELETE_CANDIDATE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === payload.id ? payload.user : user
        ),
        loading: false,
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_CANDIDATE:
      return {
        ...state,
        candidates: state.candidates.map((candidate) =>
          candidate._id === payload.id ? payload.candidate : candidate
        ),
        loading: false,
      };
    case UPDATE_CANDIDATE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default adminReducer;
