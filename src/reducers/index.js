import { combineReducers } from 'redux';
import user from './user';
import token from './token';
import trivia from './trivia';

const rootReducers = combineReducers({
  user,
  token,
  trivia,
});

export default rootReducers;
