import {
  USER_GAMER,
} from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  point: 0,
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
