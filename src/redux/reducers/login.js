import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function login(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      email: action.payload,
      name: action.payload,
    };
  default:
    return state;
  }
}

export default login;
