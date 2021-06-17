import getToken from '../../services/getToken';

export const SET_TOKEN = 'SET_TOKEN';

const dispatchToken = (obj) => ({
  type: SET_TOKEN,
  obj,
});

export const setToken = () => async (dispatch) => {
  const token = await getToken();
  localStorage.setItem('token', JSON.stringify(token));
  dispatch(dispatchToken(token));
};
