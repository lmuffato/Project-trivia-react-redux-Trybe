import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import questionsReducer from './questionsReducer';
import timerReducer from './timerReducer';
import tokenReducer from './tokenReducer';

const rootReducer = combineReducers({
  playerReducer,
  questionsReducer,
  timerReducer,
  tokenReducer,
});

export default rootReducer;
