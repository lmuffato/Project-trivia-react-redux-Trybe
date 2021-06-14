import { HANDLE_CHANGE_USER } from '../actions/actionUser';

const INITIAL_STATE = {
  email: '',
  name: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case HANDLE_CHANGE_USER:
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  default:
    return state;
  }
};

export default user;
