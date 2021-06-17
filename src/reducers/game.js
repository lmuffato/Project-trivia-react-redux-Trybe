const INITIAL_STATE = {
  questions: [],
  questionNumber: 1,
  isLoading: true,
  ranking: [ // Array Ficticio apenas pra testar o map do ranking
    {
      name: 'Luiz',
      assertions: 1,
      score: 2,
      gravatarEmail: 'luiz@bol.com',
    },
    {
      name: 'Xablau',
      assertions: 3,
      score: 4,
      gravatarEmail: 'xablau@bol.com',
    },
  ],
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
