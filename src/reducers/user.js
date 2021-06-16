import { USER, TOKEN } from '../actions';

const USER_INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
    token: '',
  },
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
  default:
    return state;
  }
};
export default user;
