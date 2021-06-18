import { combineReducers } from 'redux';
import player from './player';
import apiResponse from './apiResponse';
import filters from './filters';

const rootReducer = combineReducers({ player, apiResponse, filters });

export default rootReducer;
