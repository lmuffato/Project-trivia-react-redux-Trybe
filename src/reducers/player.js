const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
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
  default: return state;
  }
};

export default player;
