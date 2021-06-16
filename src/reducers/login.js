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
      correct: state.correct + action.correct,
    };
  default:
    return state;
  }
}
