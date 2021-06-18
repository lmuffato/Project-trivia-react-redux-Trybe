import {
  SELECT_CATEGORY, SELECT_DIFICULTE, SELECT_TYPE,
} from '../actions/index';

const INITIAL_STATE = {
  category: '',
  dificulte: '',
  type: '',
};

const filters = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SELECT_CATEGORY:
    return { ...state, category: action.payload };
  case SELECT_DIFICULTE:
    return { ...state, dificulte: action.payload };
  case SELECT_TYPE:
    return { ...state, type: action.payload };
  default:
    return state;
  }
};

export default filters;
