import { combineReducers } from 'redux';
import userReducer from './user';
import token from './token';
import questions from './questions';

const rootReducer = combineReducers({
  userData: userReducer,
  token,
  questions,
});

export default rootReducer;
