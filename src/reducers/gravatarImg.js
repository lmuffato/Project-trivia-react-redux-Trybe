import { GRAVATARVATAR } from '../constants';

const INITIAL_STATE = {
  url: '',
};

const gravatar = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GRAVATARVATAR:
    return { ...state, url: action.payload };
  default:
    return state;
  }
};

export default gravatar;
