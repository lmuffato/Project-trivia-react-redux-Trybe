import { combineReducers } from 'redux';
import userReducer from './user';
import configs from './configs';
import login from './login';

const rootReducer = combineReducers({ user: userReducer, login, configs });

export default rootReducer;
