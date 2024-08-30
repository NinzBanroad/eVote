import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import candidate from './candidate';
import user from './user';
import admin from './admin';

export default combineReducers({
  alert,
  auth,
  candidate,
  user,
  admin,
});
