const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
  gravatar: '',
};

export const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_NAME':
    return {
      ...state,
      name: action.payload.name,
    };
  case 'SET_EMAIL':
    return {
      ...state,
      email: action.payload.email,
    };
  case 'SET_URL_GRAVATAR':
    return {
      ...state,
      gravatar: action.payload.gravatar,
    };
  case 'SET_SCORE':
    return {
      ...state,
      score: action.payload.score,
    };
  default: return state;
  }
};

export default user;
