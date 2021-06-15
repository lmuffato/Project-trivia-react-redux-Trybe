import { combineReducers } from 'redux';
import PlayerReducer from './PlayerReducer';
import GameReducer from './GameReducer';

const rootReducer = combineReducers({ PlayerReducer, GameReducer });

export default rootReducer;
