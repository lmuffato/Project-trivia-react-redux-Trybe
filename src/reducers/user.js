import { USER, TOKEN, SCORE } from '../actions';

const USER_INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const user = (state = USER_INITIAL_STATE, action) => {
  switch (action.type) {
  case USER:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case TOKEN:
    return {
      ...state,
      token: action.payload,
    };
  case SCORE:
    return {
      ...state,
      score: action.payload.score,
      assertions: action.payload.totalAssertions,
    };
  default:
    return state;
  }
};
export default user;
