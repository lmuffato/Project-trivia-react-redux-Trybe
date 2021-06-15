import md5 from 'crypto-js/md5';
import getAPIToken from '../../services/getAPI';

export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const FETCH_GRAVATAR = 'FETCH_GRAVATAR';
export const GET_PLACAR = 'GET_PLACAR';

export const getPlacar = (payload) => ({
  type: GET_PLACAR,
  payload,
});

export const getGravatar = (payload) => ({
  type: FETCH_GRAVATAR,
  payload,
});

export const getToken = () => ({
  type: GET_TOKEN,
});

export const getTokenSuccess = (payload) => ({
  type: GET_TOKEN_SUCCESS,
  payload,
});

export const getTokenThunk = (value) => (dispatch) => {
  dispatch(getToken());
  getAPIToken()
    .then((result) => {
      const hash = md5(value.email);
      const hashConvert = hash.toString();
      const gravatarImg = `https://www.gravatar.com/avatar/${hashConvert}`;
      const { token } = result;
      localStorage.setItem('token', token);
      dispatch(getTokenSuccess({ ...value, token }));
      dispatch(getGravatar({ gravatarImg }));
    });
};
