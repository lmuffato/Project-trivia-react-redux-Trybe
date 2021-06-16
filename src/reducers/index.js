import { combineReducers } from 'redux';
import userReducer from './user';
// import triviaReducer from './trivia';

const rootReducer = combineReducers({ userReducer });

export default rootReducer;
