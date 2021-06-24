import { combineReducers } from 'redux';
import player from './player';
import ranking from './ranking';
import settings from './settings';

const rootReducers = combineReducers({ player, settings, ranking });

export default rootReducers;
