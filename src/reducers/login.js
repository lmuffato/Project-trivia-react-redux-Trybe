import { LOGIN } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  email: '',
};

export default function login(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      name: action.name,
      email: action.email,
    };
  default:
    return state;
  }
}
