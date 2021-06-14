import { GET_LOGIN } from '../actions/actions';

const INITIAL_STATE = {
  user: {
    nome: '',
    email: '',
  },
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_LOGIN:
    return {
      ...state,
      nome: action.payload.state.nome,
      email: action.payload.state.email,
    };

  default:
    return { ...state };
  }
};

export default loginReducer;
