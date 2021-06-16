const initialState = {
  questions: [],
  tempo: 5,
};

export default function trivia(state = initialState, action) {
  switch (action.type) {
  case 'SET_QUESTIONS':
    return { ...state, questions: action.questions };
  case 'TIMER':
    return { ...state, tempo: action.tempo };
  default:
    return state;
  }
}
