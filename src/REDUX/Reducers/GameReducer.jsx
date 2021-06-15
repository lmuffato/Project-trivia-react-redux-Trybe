const INITIAL_STATE = {
  questions: {},
};

export default function GameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SUCCESS_QUESTIONS':
    return {
      ...state, questions: action.data,
    };
  default:
    return state;
  }
}
