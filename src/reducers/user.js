const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
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
  default: return state;
  }
};

export default user;
