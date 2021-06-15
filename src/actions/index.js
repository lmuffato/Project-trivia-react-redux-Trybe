import fetchAPI from '../services/fetchtoken';

export const LOGIN = 'LOGIN';
export const TOKEN = 'TOKEN';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const tokenAction = (payload) => ({
  type: TOKEN,
  payload,
});

export const getToken = () => (dispatch) => {
  fetchAPI()
    .then((token) => dispatch(tokenAction(token.token)));
};
