import { combineReducers } from 'redux';
import user from './login';
import game from './jogo';
import timer from './timer';

const reducers = combineReducers({ user, game, timer });

export default reducers;
