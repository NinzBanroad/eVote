import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_ALL_CANDIDATES_FROM_ADMIN,
  GET_ALL_CANDIDATES_FROM_ADMIN_ERROR,
  GET_ALL_USERS_FROM_ADMIN,
  GET_ALL_USERS_FROM_ADMIN_ERROR,
  ADD_CANDIDATE,
  ADD_CANDIDATE_ERROR,
  ADD_USER,
  ADD_USER_ERROR,
  UPDATE_CANDIDATE,
  UPDATE_CANDIDATE_ERROR,
  UPDATE_USER,
  UPDATE_USER_ERROR,
  CLEAR_PROFILE,
  DELETE_USER,
  DELETE_USER_ERROR,
  DELETE_CANDIDATE,
  DELETE_CANDIDATE_ERROR,
} from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Get all candidates
export const getAllCandidatesFromAdmin = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await api.get('/admins/all-candidates');
    dispatch({
      type: GET_ALL_CANDIDATES_FROM_ADMIN,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_CANDIDATES_FROM_ADMIN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all candidates
export const getAllUsersFromAdmin = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await api.get('/admins/all-users');
    dispatch({
      type: GET_ALL_USERS_FROM_ADMIN,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_USERS_FROM_ADMIN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Candidate
export const addCandidate = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/admins/add-candidate', formData);

    dispatch({
      type: ADD_CANDIDATE,
      payload: res.data.candidate,
    });

    dispatch(setAlert('Added Candidate Successfully', 'success'));
  } catch (err) {
    dispatch({
      type: ADD_CANDIDATE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add User
export const addUser = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/admins/add-user', formData);

    dispatch({
      type: ADD_USER,
      payload: res.data.user,
    });

    dispatch(setAlert('Added User Successfully', 'success'));
  } catch (err) {
    dispatch({
      type: ADD_USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update User
export const updateUser = (id, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/admins/update-user/${id}`, formData);

    dispatch({
      type: UPDATE_USER,
      payload: { id, user: res.data },
    });

    dispatch(setAlert('Updated User Successfully', 'success'));
  } catch (err) {
    dispatch({
      type: UPDATE_USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update Candidate
export const updateCandidate = (id, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/admins/update-candidate/${id}`, formData);

    dispatch({
      type: UPDATE_CANDIDATE,
      payload: { id, candidate: res.data },
    });

    dispatch(setAlert('Updated Candidate Successfully', 'success'));
  } catch (err) {
    dispatch({
      type: UPDATE_CANDIDATE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
  try {
    await api.delete(`/admins/delete-user/${id}`);

    dispatch({
      type: DELETE_USER,
      payload: id,
    });

    dispatch(setAlert('User Removed Successfully', 'success'));
  } catch (err) {
    dispatch({
      type: DELETE_USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Candidate
export const deleteCandidate = (id) => async (dispatch) => {
  try {
    await api.delete(`/admins/delete-candidate/${id}`);

    dispatch({
      type: DELETE_CANDIDATE,
      payload: id,
    });

    dispatch(setAlert('Candidate Removed Successfully', 'success'));
  } catch (err) {
    dispatch({
      type: DELETE_CANDIDATE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
