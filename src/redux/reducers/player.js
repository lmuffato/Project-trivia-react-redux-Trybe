<<<<<<< HEAD
import { LOGIN, GET_QUESTIONS, GET_TOKEN, REQUEST_API } from '../actions/actionsTypes';
=======
import { LOGIN, GET_TOKEN } from '../actions/actionsTypes';
>>>>>>> b00ebf84f17daae3ee9186216743db13b079c199

const INNITAL_STATE = {
  email: '',
  name: '',
  token: '',
  score: 0,
  isLoalding: false,
  questions: [],
};

const player = (state = INNITAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      ...action.payload,
    };
<<<<<<< HEAD
  case REQUEST_API:
    return {
      ...state,
      isLoalding: true,
    };
=======
>>>>>>> b00ebf84f17daae3ee9186216743db13b079c199
  case GET_TOKEN:
    return {
      ...state,
      token: action.payload,
<<<<<<< HEAD
      isLoalding: false,
    };
  case GET_QUESTIONS:
    return {
      ...state,
      questions: action.payload,
      isLoalding: false,
=======
>>>>>>> b00ebf84f17daae3ee9186216743db13b079c199
    };
  default:
    return state;
  }
};

export default player;
