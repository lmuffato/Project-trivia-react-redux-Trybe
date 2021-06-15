// import {  } from '../actions';

import { ADD_PLAYER } from '../actions';

const INTIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
  // case START_FETCH:
  //   return { ...state, isLoading: true };
  // case FETCH_SUCCESS:
  //   return { ...state, token: action.payload, isLoading: false };
  case ADD_PLAYER:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default playerReducer;
