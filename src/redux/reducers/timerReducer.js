import { SAVE_TIMER, SET_DIFFICULTY, CALC_POINTS } from '../actions';

const INITIAL_STATE = {
  timer: 0,
  difficulty: '',
  calc: false,
};

function timerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_TIMER:
    return {
      ...state,
      timer: action.payload.timer,
      calc: true,
    };
  case SET_DIFFICULTY:
    return { ...state, difficulty: action.payload.difficulty };
  case CALC_POINTS:
    return { ...state, calc: false };
  default:
    return state;
  }
}

export default timerReducer;
