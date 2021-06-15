import { combineReducers } from 'redux';
import loginReduce from './loginReduce';

const rootReducers = combineReducers({ loginReduce });

export default rootReducers;
