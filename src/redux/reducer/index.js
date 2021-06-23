import { combineReducers } from 'redux';

import user from './user';
import timer from './timer';
import idInterval from './idInterval';
import questions from './questions';
import settings from './settings';
import StateInRedux from './setStateInRedux';

const rootReducer = combineReducers({
  allClass: StateInRedux.reducer(),
  user,
  timer,
  idInterval,
  questions,
  settings,
});

export default rootReducer;
