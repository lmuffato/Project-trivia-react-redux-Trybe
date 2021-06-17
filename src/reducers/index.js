import { combineReducers } from 'redux';
import questions from './questions';
import timer from './timer';

const rootReducer = combineReducers({
  questions,
  timer,
});

export default rootReducer;
