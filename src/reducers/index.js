import { combineReducers } from 'redux';
import { trivia } from './trivia';

const roootReducer = combineReducers({
  trivia,
});

export default roootReducer;
