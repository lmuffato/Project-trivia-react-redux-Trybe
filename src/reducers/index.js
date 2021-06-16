import { combineReducers } from 'redux';
import game from './game';
import player from './player';
import gameMatch from './gameMatch';

const rootReducer = combineReducers({
  game,
  player,
  gameMatch,
});

export default rootReducer;
