import { USER_INFOS } from '../actions/actionTypes';

const INITIAL_STATE = {
  login: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_INFOS:
    return {
      ...state,
      login: action.payload,
    }
    default:
    return state;
  }
};

export default user;
