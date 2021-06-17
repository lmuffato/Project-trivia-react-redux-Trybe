import { LOGIN } from '../actions/index';

const INITIAL_STATE = {
  gravatarEmail: '',
  name: '',
};

function login(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return action.payload;
  default:
    return state;
  }
}

export default login;
