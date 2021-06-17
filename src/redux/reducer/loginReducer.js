import { USER_EMAIL, USER_LOGIN, USER_SCORE, ASSERTION } from '../../common/def';

const INITIAL_STATE = {
  email: '',
  name: '',
  score: 0,
  assertions: 0,
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  case USER_LOGIN:
    return {
      ...state,
      name: action.payload,
    };
  case USER_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case ASSERTION:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
}
