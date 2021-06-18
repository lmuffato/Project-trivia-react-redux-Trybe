import { LOGIN, UPDATE_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
  assertions: 0,
};

function playReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
      score: 0,
      assertions: 0,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + parseInt(action.payload.points, 10),
      assertions: state.assertions + action.payload.assertions,
    };
  default:
    return state;
  }
}

export default playReducer;
