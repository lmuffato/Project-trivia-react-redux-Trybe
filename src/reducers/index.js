import { combineReducers } from 'redux';
import player from './player';
import settings from './settings';

const rootReducers = combineReducers({ player, settings });

export default rootReducers;
