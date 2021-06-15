import { combineReducers } from 'redux';
import login from './login';
import trivia from './trivia';
import settings from './settings';

const rootReducer = combineReducers({
  login,
  trivia,
  settings,
});

export default rootReducer;
