import { combineReducers } from 'redux';
import player from './player';
import ranking from './ranking';
import token from './token';
import questions from './questions';

const rootReducer = combineReducers({ player, ranking, token, questions });

export default rootReducer;
