import { combineReducers } from 'redux';
import { player } from './player';
import { game } from './game';
import { player } from './player';

const rootReducer = combineReducers({
  game,
  player,
});

export default rootReducer;
