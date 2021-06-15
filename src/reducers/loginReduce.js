import { NEW_LOGIN } from '../actions/index';

const INITIAL_STATE = {
  nome: '',
  email: '',
};

function loginReduce(state = INITIAL_STATE, action) {
  switch (action.type) {
  case NEW_LOGIN:
    return {
      nome: action.state.nome,
      email: action.state.email,
    };
  default:
    return state;
  }
}

export default loginReduce;
