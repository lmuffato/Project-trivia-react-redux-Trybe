import { LOGIN } from '../actions/actionsTypes';

const INNITAL_STATE = {
  email: '',
  name: '',
  token: '',
  score: 0,
};

const player = (state = INNITAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
};

export default player;
