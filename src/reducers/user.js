import {
  HANDLE_CHANGE_USER,
  GET_TOKEN,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_ERROR,
} from '../actions/actionUser';

const INITIAL_STATE = {
  email: '',
  name: '',
  isLoading: false,
  token: {},
  score: 0,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case HANDLE_CHANGE_USER:
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  case GET_TOKEN:
    return {
      ...state,
      isLoading: true,
    };
  case GET_TOKEN_SUCCESS || GET_TOKEN_ERROR:
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
    };
  default:
    return state;
  }
};

export default user;
