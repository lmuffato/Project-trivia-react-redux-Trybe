import { combineReducers } from 'redux';
import { user } from './user';
import { game } from './game';

const roootReducer = combineReducers({
  user,
  game,
});

export default roootReducer;
