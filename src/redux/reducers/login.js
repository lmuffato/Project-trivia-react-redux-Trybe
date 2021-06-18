import { LOGIN, GRAVATAR } from '../actions/index';

const INITIAL_STATE = {
  gravatarEmail: '',
  name: '',
  gravatar: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.gravatarEmail,
    };
  case GRAVATAR:
    return {
      ...state,
      gravatar: action.payload,
    };
  default:
    return state;
  }
}

export default player;
