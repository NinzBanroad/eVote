import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import candidate from './candidate';

export default combineReducers({
  alert,
  auth,
  candidate,
});
