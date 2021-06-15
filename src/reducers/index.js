import { combineReducers } from 'redux';
import user from './user';
import ranking from './ranking';
import questionsApi from './questionsApi';

const rootReducer = combineReducers({ user, ranking, questionsApi });

export default rootReducer;
