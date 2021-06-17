import { LOGIN } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
  correct: 0,
};

export default function login(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      name: action.name,
      email: action.email,
    };
  case 'SCORE':
    return {
      ...state,
      score: state.score + action.score,
      correct: state.correct + 1,
    };
  case 'CLEAR_USER_DATA':
    return INITIAL_STATE;
  default:
    return state;
  }
}
