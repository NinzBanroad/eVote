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
  ADD_UPDATE_PLATFORM,
  ADD_UPDATE_PLATFORM_ERROR,
  DELETE_PLATFORM,
  DELETE_PLATFORM_ERROR,
  GET_PLATFORM,
  GET_PLATFORM_ERROR,
  GET_CURRENT_CANDIDATE,
  GET_CURRENT_CANDIDATE_ERROR,
} from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Get Current Candidate
export const getCurrentCandidate = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/candidates/current-candidate/${id}`);
    dispatch({
      type: GET_CURRENT_CANDIDATE,
      payload: res.data.hasvoted,
    });
  } catch (err) {
    dispatch({
      type: GET_CURRENT_CANDIDATE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

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

// Get Candidate Platform
export const getPlatform = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/candidates/get-platform/${id}`);
    dispatch({
      type: GET_PLATFORM,
      payload: res.data.platform,
    });
  } catch (err) {
    dispatch({
      type: GET_PLATFORM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add/Update Candidate Platform
export const addUpdatePlatform = (formData) => async (dispatch) => {
  const body = formData;
  try {
    const res = await api.post('/candidates/add-platform', body);
    dispatch({
      type: ADD_UPDATE_PLATFORM,
      payload: res.data.platform,
    });
  } catch (err) {
    dispatch({
      type: ADD_UPDATE_PLATFORM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add/Update Candidate Platform
export const deletePlatform = (id) => async (dispatch) => {
  try {
    const res = await api.post(`/candidates/delete-platform/${id}`);
    dispatch({
      type: DELETE_PLATFORM,
      payload: res.data.platform,
    });
  } catch (err) {
    dispatch({
      type: DELETE_PLATFORM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
