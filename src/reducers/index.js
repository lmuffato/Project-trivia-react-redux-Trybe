import { combineReducers } from 'redux';
import game from './game';
import playerReducer from './player';

const rootReducer = combineReducers({ game, playerReducer });

export default rootReducer;
