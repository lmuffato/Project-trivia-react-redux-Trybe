import { TIME } from '../actions';

const INITIAL_STATE = {
  disableByTime: false,
};

function disableButton(state = INITIAL_STATE, action) {
  switch (action.type) {
  case TIME:
    return {
      ...state,
      disableByTime: action.payload,
    };
  default:
    return state;
  }
}

export default disableButton;
