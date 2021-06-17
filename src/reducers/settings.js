import { ADD_FILTER } from '../actions';

const INITIAL_STATE = {
  filter: {},
};

const settingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_FILTER:
    return { ...action.payload };
  default:
    return state;
  }
};

export default settingsReducer;
