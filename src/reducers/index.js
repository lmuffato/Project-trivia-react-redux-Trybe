import { combineReducers } from 'redux';
import player from './playerReducer';
import triviaReducer from './triviaReducer';

const rootReducer = combineReducers({
  player,
  triviaReducer,
});

export default rootReducer;
