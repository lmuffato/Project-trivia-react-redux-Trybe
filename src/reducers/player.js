const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  gravatar: '',
};

export const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_NAME':
    return {
      ...state,
      name: action.payload.name,
    };
  case 'SET_EMAIL':
    return {
      ...state,
      gravatarEmail: action.payload.email,
    };
  case 'SET_URL_GRAVATAR':
    return {
      ...state,
      gravatar: action.payload.gravatar,
    };
  case 'SET_SCORE':
    return {
      ...state,
      score: state.score + action.payload.score,
    };
  case 'ADD_ASSERTION':
    return {
      ...state,
      assertions: state.assertions + action.payload.assertions,
    };
  default: return state;
  }
};

export default player;
