import { combineReducers } from 'redux';
import userReducer from './user';
import configs from './configs';
import login from './login';
import score from './score';

const rootReducer = combineReducers({ user: userReducer, login, configs, score });

export default rootReducer;
