import {
  ADD_USER_VOTE,
  ADD_USER_VOTE_ERROR,
  GET_USER_VOTE,
  GET_USER_VOTE_ERROR,
} from '../actions/types';

const initialState = {
  votes: [],
  vote: null,
  loading: true,
  error: {},
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
    default:
      return state;
  }
}

export default userReducer;
