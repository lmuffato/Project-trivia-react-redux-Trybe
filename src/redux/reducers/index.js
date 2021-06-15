import { combineReducers } from 'redux';
import userReducer from './user';
import login from './login';

const rootReducer = combineReducers({ user: userReducer, login });

export default rootReducer;
