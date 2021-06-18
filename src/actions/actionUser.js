export const HANDLE_CHANGE_USER = 'HANDLE_CHANGE_USER';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_ERROR = 'GET_TOKEN_ERROR';

export const handleChangeUser = (name, value) => ({
  type: HANDLE_CHANGE_USER,
  payload: {
    name,
    value,
  },
});

export const getToken = () => ({
  type: GET_TOKEN,
});

export const getTokenSuccess = (token) => ({
  type: GET_TOKEN_SUCCESS,
  payload: {
    token,
  },
});

export const getTokenError = (error) => ({
  type: GET_TOKEN_ERROR,
  payload: {
    token: error,
  },
});

export const getTokenThunk = () => async (dispatch) => {
  dispatch(getToken());
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    dispatch(getTokenSuccess(data));
  } catch (error) {
    dispatch(getTokenError(error));
  }
};
