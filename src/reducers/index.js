import { combineReducers } from 'redux';
import game from './game';
import playerFunction from './player';

const rootReducer = combineReducers({ game, playerFunction });

export default rootReducer;
