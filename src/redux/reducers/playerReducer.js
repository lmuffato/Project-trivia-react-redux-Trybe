import { LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: '',
};

function playReducer(state = INITIAL_STATE, action) {
  console.log(action.payload);
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  default:
    return state;
  }
}

export default playReducer;
