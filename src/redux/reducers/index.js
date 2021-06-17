import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import questionsReducer from './questionsReducer';
import tokenReducer from './tokenReducer';

const rootReducer = combineReducers({ playerReducer, questionsReducer, tokenReducer });

export default rootReducer;
