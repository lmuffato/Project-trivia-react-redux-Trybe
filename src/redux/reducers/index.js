import { combineReducers } from 'redux';
import player from './login';
import score from './score';

const rootReducer = combineReducers({
  player,
  score,
});

export default rootReducer;
