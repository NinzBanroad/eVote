import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_ALL_CANDIDATES,
  GET_ALL_CANDIDATES_ERROR,
  ADD_CANDIDATE_VOTE,
  ADD_CANDIDATE_VOTE_ERROR,
  GET_CANDIDATE_VOTE,
  GET_CANDIDATE_VOTE_ERROR,
  CLEAR_PROFILE,
} from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Get all candidates
export const getAllCandidates = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await api.get('/candidates/all-candidates');
    dispatch({
      type: GET_ALL_CANDIDATES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_CANDIDATES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Candidate Vote
export const addCandidateVote = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/candidates/add-vote', formData);

    dispatch({
      type: ADD_CANDIDATE_VOTE,
      payload: res.data,
    });

    dispatch(setAlert('Added Vote Successfully', 'success'));
  } catch (err) {
    dispatch({
      type: ADD_CANDIDATE_VOTE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Candidate Vote
export const getCandidateVote = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/candidates/vote/${id}`);
    dispatch({
      type: GET_CANDIDATE_VOTE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_CANDIDATE_VOTE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
