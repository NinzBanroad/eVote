import api from '../utils/api';
import { setAlert } from './alert';
import {
  ADD_USER_VOTE,
  ADD_USER_VOTE_ERROR,
  GET_USER_VOTE,
  GET_USER_VOTE_ERROR,
} from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Add User Vote
export const addUserVote = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/users/add-vote', formData);

    dispatch({
      type: ADD_USER_VOTE,
      payload: res.data,
    });

    dispatch(setAlert('Added Vote Successfully', 'success'));
  } catch (err) {
    dispatch({
      type: ADD_USER_VOTE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get User Vote
export const getUserVote = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/users/vote/${id}`);
    dispatch({
      type: GET_USER_VOTE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_USER_VOTE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
