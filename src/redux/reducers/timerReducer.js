import { SAVE_TIMER, SET_DIFFICULTY } from '../actions';

const INITIAL_STATE = {
  timer: '',
  difficulty: '',
};

function timerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_TIMER:
    return {
      ...state,
      timer: action.payload.timer,
    };
  case SET_DIFFICULTY:
    return { ...state, difficulty: action.payload.difficulty };
  default:
    return state;
  }
}

export default timerReducer;
