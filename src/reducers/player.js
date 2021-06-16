import {
  NEW_EMAIL,
  NEW_TOKEN,
  CORRET_ANSWER,
} from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
  token: '',
  score: '',
  assertions: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case NEW_EMAIL:
    return {
      ...state,
      email: action.payload.email,
      name: action.payload.name,
    };
  case NEW_TOKEN:
    return {
      ...state,
      token: action.payload.token,
    };
  case CORRET_ANSWER:
    return {
      ...state,
      score: action.score,
      assertions: action.score,
    };
  default:
    return state;
  }
}

export default userReducer;
