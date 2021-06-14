import { START_FETCH, FETCH_SUCCESS } from '../actions';

const INTIAL_STATE = {
  token: '',
  query: {},
  isLoading: false,
};

const reducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
  case START_FETCH:
    return { ...state, isLoading: true };
  case FETCH_SUCCESS:
    return { ...state, token: action.payload, isLoading: false };
  default:
    return state;
  }
};

export default reducer;
