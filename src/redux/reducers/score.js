import { RECEIVE_SCORE, CLEAR_SCORE } from '../actions/setScore';

const INIT_STATE = {
  assertions: 0,
  score: 0,
};

const scoreReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
  case RECEIVE_SCORE: {
    return { ...state, ...action.score };
  }
  case CLEAR_SCORE: {
    return { ...state, assertions: 0, score: 0 };
  }
  default: {
    return state;
  }
  }
};

export default scoreReducer;
