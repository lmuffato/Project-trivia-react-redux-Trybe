import { combineReducers } from 'redux';

import user from './user';
import timer from './timer';

const rootReducer = combineReducers({
  user,
  timer,
});

export default rootReducer;
