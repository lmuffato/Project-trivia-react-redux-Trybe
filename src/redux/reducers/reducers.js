import { combineReducers } from 'redux';
import loginReducer from './login';
import jogoReducer from './jogo';

const reducers = combineReducers({ loginReducer, jogoReducer });

export default reducers;
