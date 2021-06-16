import { SET_GRAVATAR } from '../constants';

const INITIAL_STATE = {
  url: '',
};

const gravatar = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_GRAVATAR:
    return { ...state, url: action.payload };
  default:
    return state;
  }
};

export default gravatar;
