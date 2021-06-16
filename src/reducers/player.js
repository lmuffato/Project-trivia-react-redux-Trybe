import { ADD_PLAYER } from '../actions';

const INTIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  picture: 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e',
};

const playerReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
  case ADD_PLAYER:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default playerReducer;
