import { combineReducers } from 'redux';
import player from './player';
import ranking from './ranking';
import token from './token';

const rootReducer = combineReducers({ player, ranking, token });

export default rootReducer;
