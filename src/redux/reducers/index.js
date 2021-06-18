import { combineReducers } from 'redux';
import player from './player';
import ranking from './ranking';
import config from './config';
// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const rootReducer = combineReducers({
  player,
  ranking,
  config,
});

export default rootReducer;
