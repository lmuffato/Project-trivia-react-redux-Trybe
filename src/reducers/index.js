import { combineReducers } from 'redux';
import player from './player';
import apiResponse from './apiResponse';

const rootReducer = combineReducers({ player, apiResponse });

export default rootReducer;
