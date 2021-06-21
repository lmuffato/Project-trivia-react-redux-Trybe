import { SET_QUESTIONS, TIMER_OUT } from '../actions';

const INITIAL_STATE = {
  trivia: [],
  timeOut: false,
  points: 0,
};

const trivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  // case GAME_TRIVIA:
  //   return { ...state, trivia: action.payload };
  case SET_QUESTIONS:
    return { ...state, trivia: action.payload };
  case TIMER_OUT:
    return { ...state, timeOut: !(state.timeOut), points: state.points + action.payload };
  default:
    return state;
  }
};

export default trivia;
