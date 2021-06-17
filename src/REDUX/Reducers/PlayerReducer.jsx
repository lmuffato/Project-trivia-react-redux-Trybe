import { LOGIN } from '../Actions/index';

const INITIAL_STATE = {
  name: '',
  email: '',
  user: {},
  gravatar: {},
};


const ArrState = [
  {
    player: {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    },
  },
];

export default function PlayerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state, name: action.payload.name, email: action.payload.email,
    };
  case 'SUCCESS_REQUEST':
    localStorage.setItem('token', JSON.stringify(action.data.token));
    localStorage.setItem('ranking', JSON.stringify(ArrState));
    localStorage.setItem('state', JSON.stringify(action.objState));
    return {
      ...state, user: action.data,
    };
  case 'GRAVATAR':
    return {
      ...state, gravatar: action.gravatar,
    };
  default:
    return state;
  }
}
