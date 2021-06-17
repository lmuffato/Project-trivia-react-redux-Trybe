import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import questionsReducer from './questionsReducer';
import timerReducer from './timerReducer';

const rootReducer = combineReducers({ playerReducer, questionsReducer, timerReducer });

export default rootReducer;
