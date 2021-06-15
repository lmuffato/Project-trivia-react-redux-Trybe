import { FETCH_QUESTIONS } from '../../common/def';

const INITIAL_STATE = {
  questions: { results: [] },
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_QUESTIONS:
    return {
      ...state,
      questions: { ...action.payload },
    };
  default:
    return state;
  }
}
