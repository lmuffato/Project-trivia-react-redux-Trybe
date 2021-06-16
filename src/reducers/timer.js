import {
  SET_TIMER,
} from '../actions/actionTimer';

const INITIAL_STATE = { timer: 30 };

const timer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_TIMER:
    return {
      timer: state.timer - 1,
    };
  default:
    return state;
  }
};

export default timer;
