import { USER_EMAIL, USER_LOGIN, USER_SCORE } from '../../common/def';

const INITIAL_STATE = {
  email: '',
  user: '',
  score: 0,
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
      user: action.payload,
    };
  case USER_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  default:
    return state;
  }
}
