import { combineReducers } from 'redux';
import user from './user';
import ranking from './ranking';

const rootReducer = combineReducers({ user, ranking });

export default rootReducer;
