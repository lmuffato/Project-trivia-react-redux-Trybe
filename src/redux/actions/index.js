import getAPIToken from '../../services/getAPI';
// import getGravatarImg from '../../services/getGravatarImg';

// export const LOGIN = 'LOGIN';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';

/* export const login = (payload) => ({
  type: LOGIN,
  payload,
}); */

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
      const { token } = result;
      localStorage.setItem('token', token);
      dispatch(getTokenSuccess({ ...value, token }));
    });
};
