import { LOGIN, USER_DATA, RECEIVE_QUESTS } from '../actions/index';

const INITIAL_STATE = {
  token: '',
  name: '',
  email: '',
  questions: '',
};

function tokenReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    window.localStorage.setItem('token', action.token);
    return { ...state, token: action.token };
  case USER_DATA:
    return { ...state, name: action.name, email: action.email };
  case RECEIVE_QUESTS:
    return { ...state, questions: action.questions.results };
  default:
    return state;
  }
}

export default tokenReducer;
