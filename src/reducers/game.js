const INITIAL_STATE = {
  questions: [],
  questionNumber: 1,
  isLoading: true,
  ranking: [],
};

export const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'API_SUCCESS':
    return {
      ...state,
      isLoading: false,
      questions: state.questions.concat(action.payload),
    };
  case 'API_ERROR':
    return {
      ...state,
      error: action.payload,
    };
  default: return state;
  }
};

export default game;
