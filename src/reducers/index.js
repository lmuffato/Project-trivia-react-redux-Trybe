import { combineReducers } from 'redux';
import game from './game';
import player from './player';

const rootReducer = combineReducers({
  game,
  player,
});

export default rootReducer;
