import { IS_FETCHING, SETTINGS, SET_CATEGORIES } from '../action';

const initialState = {
  amount: 5,
  category: '',
  difficulty: '',
  type: '',
  enconde: '',
  isFetching: true,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case SETTINGS:
    return { ...state, ...payload };
  case IS_FETCHING:
    return { ...state, isFetching: true };
  case SET_CATEGORIES:
    return { ...state, categories: payload.trivia_categories, isFetching: false };
  default:
    return state;
  }
};
