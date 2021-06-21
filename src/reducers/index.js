import { combineReducers } from 'redux';
import game from './game';
import player from './player';
import gameMatch from './gameMatch';
import gameTranslation from './gameTranslation';

const rootReducer = combineReducers({
  game,
  player,
  gameMatch,
  gameTranslation,
});

export default rootReducer;
