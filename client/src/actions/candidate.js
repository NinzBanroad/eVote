import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_ALL_CANDIDATES,
  GET_ALL_CANDIDATES_ERROR,
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
