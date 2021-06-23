import { USER_LOGIN,
  USER_NAME,
  SCORE_ADD,
  SAVE_TIME_LEFT,
  SET_TIMER_ACTIVE, USER_IMAGE, RESET_SCORE } from '../actions';

const INITIAL_STATE = {
  email: '',
  user: '',
  playerScore: 0,
  assertions: 0,
  time: 0,
  isTimerActive: true,
  image: '',
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case USER_LOGIN:
    return { ...state, email: payload };
  case USER_NAME:
    return { ...state, user: payload };
  case SCORE_ADD:
    return {
      ...state,
      playerScore: payload,
      assertions: state.assertions + 1,
    };
  case SAVE_TIME_LEFT:
    return {
      ...state,
      time: payload,
      isTimerActive: false,
    };
  case SET_TIMER_ACTIVE:
    return {
      ...state,
      isTimerActive: payload,
    };
  case USER_IMAGE:
    return {
      ...state,
      image: payload,
    };
  case RESET_SCORE:
    return {
      ...state,
      playerScore: 0,
      assertions: 0,
      email: '',
      user: '',
    };
  default:
    return state;
  }
};

export default userReducer;
