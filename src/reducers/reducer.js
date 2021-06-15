import { combineReducers } from 'redux';
import user from './user';
import gravatar from './gravatar';
import trivia from './trivia';

const rootReducer = combineReducers({ user, gravatar, trivia });

export default rootReducer;
