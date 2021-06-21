import { combineReducers } from 'redux';
import userReducer from './userReducer';
import timerReducer from './timerReducer';

const rootReducer = combineReducers({ userReducer, timerReducer });

export default rootReducer;
