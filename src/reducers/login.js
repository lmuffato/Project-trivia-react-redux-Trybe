import { USER_NAME, PICTURE } from '../actions/index';

const INITIAL_STATE = {
  picture: '',
  token: '',
  name: '',
  email: '',
};

function tokenReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOGIN':
    window.localStorage.setItem('token', action.token);
    return { ...state, token: action.token };
  case USER_NAME:
    return { ...state, name: action.payload };
  case PICTURE:
    return { ...state, picture: action.payload };
  default:
    return state;
  }
}

export default tokenReducer;
