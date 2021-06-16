import { ADD_PLAYER, RIGHT_ANSWER } from '../actions';

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
  case RIGHT_ANSWER:
    return { ...state,
      assertions: state.assertions + 1,
      score: state.score + action.payload };
  default:
    return state;
  }
};

export default playerReducer;
