import {
  USER_GAMER,
} from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

function userReducer(state = INITIAL_STATE, { payload, type }) {
  switch (type) {
  case USER_GAMER:
    return {
      ...state,
      name: payload.user,
      email: payload.email,
    };
  default:
    return state;
  }
}

export default userReducer;
