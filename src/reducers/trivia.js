import { GET_QUESTIONS } from '../constants';

const INITIAL_STATE = {
  questions: [],
};

const gravatar = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS:
    return { ...state, questions: [...state.questions, ...action.payload.results] };
  default:
    return state;
  }
};

export default gravatar;
