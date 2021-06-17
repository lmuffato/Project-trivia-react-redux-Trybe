import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import gameReducer from './gameReducer';
import timerReducer from './timerReducer';

const rootReducer = combineReducers({
  loginReducer,
  gameReducer,
  timerReducer,
});

export default rootReducer;
