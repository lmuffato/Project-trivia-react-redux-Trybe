import { LOGIN, GET_QUESTIONS, GET_TOKEN, REQUEST_API,
  ADD_GRAVATAR, UPDATE_SCORE } from '../actions/actionsTypes';

const INNITAL_STATE = {
  gravatarEmail: '',
  name: '',
  token: '',
  score: 0,
  isLoalding: false,
  questions: [],
  gravatar: '',
  assertations: 0,
};

const player = (state = INNITAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...state, ...action.payload };
  case REQUEST_API:
    return { ...state, isLoalding: true };
  case GET_TOKEN:
    return {
      ...state,
      token: action.payload,
      isLoalding: false,
    };
  case GET_QUESTIONS:
    return {
      ...state,
      questions: action.payload,
      isLoalding: false,
    };
  case ADD_GRAVATAR:
    return { ...state, gravatar: action.payload };
  case UPDATE_SCORE:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default player;
