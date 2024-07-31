import api from '../utils/api';
import { setAlert } from './alert';
import {
  USER_ROLE_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Load User/Admin/Candidate
export const loadUserRole = () => async (dispatch) => {
  try {
    const res = await api.get('/auth/get/user-role');
    dispatch({
      type: USER_ROLE_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    const role = await api.post('/auth/user-type', body);
    if (role.data === 'admin') {
      const res = await api.post('/auth/admin', body);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      //every login will dispatch loadUserRole to fetch user/admin/candidate
      dispatch(loadUserRole());
    } else if (role.data === 'candidate') {
      const res = await api.post('/auth/candidate', body);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      //every login will dispatch loadUserRole to fetch user/admin/candidate
      dispatch(loadUserRole());
    } else {
      const res = await api.post('/auth/user', body);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      //every login will dispatch loadUserRole to fetch user/admin/candidate
      dispatch(loadUserRole());
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout
export const logout = () => ({ type: LOGOUT });
