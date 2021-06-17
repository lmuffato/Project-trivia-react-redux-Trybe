import { FETCH_QUESTIONS } from '../../common/def';

const INITIAL_STATE = {
  questions: [],
};

export default function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_QUESTIONS:
    return {
      ...state,
      questions: [...action.payload],
    };
  default:
    return state;
  }
}
