import {
  NEW_EMAIL,
  NEW_TOKEN,
  CHANGE_SCORE,
  RESET_PLAYER_REDUCER,
} from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
  token: '',
  score: 0,
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case NEW_EMAIL:
    return {
      ...state,
      email: action.payload.email,
      name: action.payload.name,
    };
  case NEW_TOKEN:
    return {
      ...state,
      token: action.payload.token,
    };
  case CHANGE_SCORE:
    return ({
      ...state,
      score: state.score + action.payload,
    });

  case RESET_PLAYER_REDUCER:
    return ({
      ...state,
      state: INITIAL_STATE,
    });

  default:
    return state;
  }
}

export default userReducer;
