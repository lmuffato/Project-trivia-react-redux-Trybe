import { USER_LOGIN,
  USER_NAME, SCORE_ADD, SAVE_TIME_LEFT, SET_TIMER_ACTIVE, USER_IMAGE } from '../actions';

const INITIAL_STATE = {
  email: '',
  user: '',
  score: 0,
  assertions: 0,
  time: 0,
  isTimerActive: true,
  image: '',
  scoreLocalStorage: 0,
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
      score: payload,
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
  default:
    return state;
  }
};

export default userReducer;
