import { combineReducers } from 'redux';
import login from './login';
import disableButton from './disableButton';

const rootReducer = combineReducers({
  login,
  disableButton,
});

export default rootReducer;
