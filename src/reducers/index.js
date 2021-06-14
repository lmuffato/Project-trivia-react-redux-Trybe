import { combineReducers } from 'redux';
import user from './user';
import trivia from './trivia';

const rootReducers = combineReducers({
  user,
  trivia,
});

export default rootReducers;
