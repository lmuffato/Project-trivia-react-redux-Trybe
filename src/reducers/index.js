import { combineReducers } from 'redux';
import questionGame from './reducerQestion';

const rootReducer = combineReducers({
  questionGame,
});

export default rootReducer;
