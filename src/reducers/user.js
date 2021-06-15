import { USER } from '../actions';

const USER_INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
  },
};

const user = (state = USER_INITIAL_STATE, action) => {
  switch (action.type) {
  case USER:
    return {
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  default:
    return state;
  }
};
export default user;
