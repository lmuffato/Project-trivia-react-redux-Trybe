import {
  LOGIN, GET_TOKEN, ADD_GRAVATAR,
} from '../actions/actionsTypes';

const INNITAL_STATE = {
  email: '',
  name: '',
  token: '',
  score: 0,
  gravatar: '',
};

const player = (state = INNITAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      ...action.payload,
    };
  case GET_TOKEN:
    return {
      ...state,
      token: action.payload,
    };
  case ADD_GRAVATAR:
    return { ...state, gravatar: action.payload };
  default:
    return state;
  }
};

export default player;
