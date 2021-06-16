import { LOG_IN, REQUEST_TOKEN, SAVE_AVATAR } from '../actions';

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
  default:
    return state;
  }
};

export default player;
