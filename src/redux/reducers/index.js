import { combineReducers } from 'redux';
import userReducer from './user';
import token from './token';
import questions from './questions';
import scoreReducer from './score';

const rootReducer = combineReducers({
  userData: userReducer,
  token,
  questions,
  score: scoreReducer,
});

export default rootReducer;
