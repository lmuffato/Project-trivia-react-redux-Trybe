const INITIAL_STATE = {
  nome: '',
  email: '',
  score: 0,
};

export const trivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_NAME':
    return {
      ...state,
      nome: action.payload.nome,
    };
  case 'SET_EMAIL':
    return {
      ...state,
      email: action.payload.email,
    };
  default: return state;
  }
};

export default trivia;
