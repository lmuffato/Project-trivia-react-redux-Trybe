import fetchAPI from '../services/fetchtoken';
import fetchTrivia from '../services/fetchtrivia';
// import Trivia from '../components/trivia';

export const USER_INFO = 'USER_INFO';
export const GAME_TRIVIA = 'GAME_TRIVIA';
export const TOKEN = 'TOKEN';

export const getUserInfo = (payload) => ({
  type: USER_INFO,
  payload,
});

export const sendTrivia = (payload) => ({
  type: GAME_TRIVIA,
  payload,
});

export const tokenAction = (payload) => ({
  type: TOKEN,
  payload,
});

export const getTrivia = () => (dispatch) => {
  fetchTrivia()
    .then((trivia) => dispatch(sendTrivia(trivia)));
};

export const getToken = () => (dispatch) => {
  fetchAPI()
    .then((token) => dispatch(tokenAction(token.token)));
};
