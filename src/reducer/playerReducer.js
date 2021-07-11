import { USER_INFOS, GET_TOKEN } from '../actions/actionTypes';

const INITIAL_STATE = {
  gravatarEmail: '',
  name: '',
  token: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_INFOS:
    return {
      ...state,
      gravatarEmail: action.payload.gravatarEmail,
      name: action.payload.name,
    };
  case GET_TOKEN:
    return {
      ...state,
      token: action.payload,
    };
  default:
    return state;
  }
};

export default player;
