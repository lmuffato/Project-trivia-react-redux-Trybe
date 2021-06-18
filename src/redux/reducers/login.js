import { SAVE_USER } from '../actions/actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USER:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };

  default:
    return state;
  }
};

export default loginReducer;
