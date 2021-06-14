import { GET_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  ranking: [],
  token: '',
  questions: [],
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS:
    return {};
  default:
    return state;
  }
};

export default gameReducer;
