import { combineReducers } from 'redux';
import player from './login';
import score from './score';
import assertions from './quantyAssertions';

const rootReducer = combineReducers({
  player,
  score,
  assertions,
});

export default rootReducer;
