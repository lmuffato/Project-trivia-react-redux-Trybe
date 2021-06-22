import { combineReducers } from 'redux';

import user from './user';
import timer from './timer';
import idInterval from './idInterval';
import questions from './questions';
import settings from './settings';

const rootReducer = combineReducers({
  user,
  timer,
  idInterval,
  questions,
  settings,
});

export default rootReducer;
