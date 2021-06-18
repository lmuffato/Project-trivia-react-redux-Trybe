import { combineReducers } from 'redux';
import player from './player';
import gameReducer from './game';
import questionsReducer from './questions';

const rootReducer = combineReducers({
  player, gameReducer, questionsReducer,
});

export default rootReducer;
