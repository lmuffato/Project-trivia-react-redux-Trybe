import { combineReducers } from 'redux';
import tokenReducer from './login';

const rootReducer = combineReducers({
  tokenReducer,
});

export default rootReducer;
