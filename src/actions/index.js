export const LOG_IN = 'LOG_IN';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';

export const login = (payload) => ({
  type: LOG_IN,
  payload,
});

export const requestToken = (payload) => ({
  type: REQUEST_TOKEN,
  payload,
});

export const fetchToken = (hash) => async (dispatch) => {
  try {
    const response = await fetch(`https://www.gravatar.com/avatar/${hash}`);
    const token = await response.json();

    console.log(token);

    dispatch(requestToken(token));
  } catch (error) {
    console.log('Deu ruim', error);
  }
};
