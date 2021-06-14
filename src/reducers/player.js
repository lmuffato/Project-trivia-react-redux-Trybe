// import {  } from '../actions';

const INTIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
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
