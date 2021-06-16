import fetchAPI from '../services/fetchtoken';

export const USER_INFO = 'USER_INFO';
export const TOKEN = 'TOKEN';

export const getUserInfo = (payload) => ({
  type: USER_INFO,
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
