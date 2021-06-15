import { combineReducers } from 'redux';
import user from './user';
import gravatar from './gravatarImg';

const rootReducer = combineReducers({ user, gravatar });

export default rootReducer;
