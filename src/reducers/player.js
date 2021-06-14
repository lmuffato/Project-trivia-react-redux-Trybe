import { NEW_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case NEW_EMAIL:
    return {
      ...state,
      email: action.payload,
    };

  default:
    return state;
  }
}

export default userReducer;
