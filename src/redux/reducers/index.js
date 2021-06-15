import { combineReducers } from 'redux';
import player from './Player';
import game from './Game';

const rootReducer = combineReducers({
  player,
  game,
});

export default rootReducer;
