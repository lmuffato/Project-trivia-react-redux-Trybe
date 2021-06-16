import { QUESTIONS_API } from '../actions';

const QUESTIONS_INITIAL_STATE = {
  questions: {
    results: [],
  },
};

const user = (state = QUESTIONS_INITIAL_STATE, action) => {
  switch (action.type) {
  case QUESTIONS_API:
    console.log(action.payload);
    return {
      questions: action.payload,
    };
  default:
    return state;
  }
};
export default user;
