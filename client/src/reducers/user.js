import {
  ADD_USER_VOTE,
  ADD_USER_VOTE_ERROR,
  GET_USER_VOTE,
  GET_USER_VOTE_ERROR,
  GET_ALL_USERS,
  GET_ALL_USERS_ERROR,
} from '../actions/types';

const initialState = {
  votes: [],
  vote: null,
  loading: true,
  error: {},
  users: [],
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_USER_VOTE:
      return {
        ...state,
        loading: false,
      };
    case ADD_USER_VOTE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_USER_VOTE:
      return {
        ...state,
        vote: payload,
        loading: false,
      };
    case GET_USER_VOTE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case GET_ALL_USERS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        users: null,
      };
    default:
      return state;
  }
}

export default userReducer;
