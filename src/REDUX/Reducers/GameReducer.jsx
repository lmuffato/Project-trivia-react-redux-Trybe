const INITIAL_STATE = {
  questions: {},
  isLoading: false,
};

export default function GameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'IS_LOADING':
    return {
      ...state, isLoading: true,
    };
  case 'SUCCESS_QUESTIONS':
    return {
      ...state, questions: action.data, isLoading: false,
    };
  default:
    return state;
  }
}
