import { GET_QUESTIONS, GET_TOKEN, GET_TOKEN_SUCCESS } from '../actions';

const INITIAL_STATE = {
  ranking: [],
  token: '',
  questions: [],
  loading: false,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS:
    return {};
  case GET_TOKEN:
    return {
      ...state,
      loading: true,
    };
  case GET_TOKEN_SUCCESS:
    return {
      ...state,
      token: action.payload.token,
      loading: false,
    };
  default:
    return state;
  }
};

export default game;
