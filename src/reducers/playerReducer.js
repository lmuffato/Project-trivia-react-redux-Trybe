import { LOG_IN, REQUEST_TOKEN, SAVE_AVATAR, GET_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  playerEmail: '',
  token: '',
  avatar: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOG_IN:
    return {
      ...state,
      name: action.payload.name,
      playerEmail: action.payload.email,
      assertions: action.payload.assertions,
      score: action.payload.score,
    };
  case REQUEST_TOKEN:
    return {
      ...state,
      token: action.payload,
    };
  case SAVE_AVATAR:
    return {
      ...state,
      avatar: action.payload,
    };
  case GET_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default player;
