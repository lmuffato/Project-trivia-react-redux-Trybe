import { combineReducers } from 'redux';
import playerReducer from './PlayerReducer';
import gameReducer from './GameReducer';

const rootReducer = combineReducers({
  playerReducer,
  gameReducer,
});

export default rootReducer;
