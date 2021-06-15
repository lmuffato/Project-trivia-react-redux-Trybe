import { combineReducers } from 'redux';
import gameData from './gameData';
import player from './player';

const reducers = combineReducers({
  gameData,
  player,
});

export default reducers;
