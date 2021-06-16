import { LOGIN } from '../Actions/index';

const INITIAL_STATE = {
  name: '',
  email: '',
  user: {},
};

const player = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

export default function PlayerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state, name: action.payload.name, email: action.payload.email,
    };
  case 'SUCCESS_REQUEST':
    localStorage.setItem('token', JSON.stringify(action.data.token));
    localStorage.setItem('state', JSON.stringify(player));
    return {
      ...state, user: action.data,
    };
  default:
    return state;
  }
}
