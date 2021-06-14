import { combineReducers } from 'redux';
import userReducer from './user';

const rootReducer = combineReducers({
  userData: userReducer,
});

export default rootReducer;
