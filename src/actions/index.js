export const LOG_IN = 'LOG_IN';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';

export const login = (payload) => ({
  type: LOG_IN,
  payload,
});

const requestToken = (payload) => ({
  type: REQUEST_TOKEN,
  payload,
});

export const fetchToken = () => async (dispatch) => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const token = await response.json();
    localStorage.setItem('token', token.token);
    return dispatch(requestToken(token.token));
  } catch (error) {
    console.log('Erro na resposta do Token na função fetchToken', error);
  }
};
