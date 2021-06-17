import { combineReducers } from 'redux';
import gameData from './gameData';
import player from './player';
import settings from './settings';

const reducers = combineReducers({
  gameData,
  player,
  settings,
});

export default reducers;
