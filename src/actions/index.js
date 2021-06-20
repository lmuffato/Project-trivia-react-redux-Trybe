export const setNameAction = (name) => ({
  type: 'SET_NAME',
  payload: {
    name,
  },
});

export const setEmailAction = (email) => ({
  type: 'SET_EMAIL',
  payload: {
    email,
  },
});

export const setUrlAction = (gravatar) => ({
  type: 'SET_URL_GRAVATAR',
  payload: {
    gravatar,
  },
});

export const setScoreAction = (score) => ({
  type: 'SET_SCORE',
  payload: {
    score,
  },
});

export const AddAssertion = (assertion) => ({
  type: 'ADD_ASSERTION',
  payload: {
    assertion,
  },
});

// ------- QUESTION API REQUESTS -----------

export const getApiQuestionsSuccess = (payload) => ({
  type: 'API_SUCCESS',
  payload,
});

export const getApiQuestionsError = (payload) => ({
  type: 'API_ERROR',
  payload: {
    payload,
  },
});

// ----------- thunk --------------

export const getApiQuestionsThunk = () => async (dispatch) => {
  const verifiedToken = JSON.parse(localStorage.getItem('token')) || [];
  if (verifiedToken.token) {
    fetch(`https://opentdb.com/api_token.php?command=reset&token=${verifiedToken.token}`);
    const data = await fetch(`https://opentdb.com/api.php?amount=5&token=${verifiedToken.token}`);
    const result = await data.json();
    dispatch(getApiQuestionsSuccess(result.results));
    localStorage.setItem('token', JSON.stringify(verifiedToken));
  } else if (!verifiedToken.token) {
    const resolve = await fetch('https://opentdb.com/api_token.php?command=request');
    const token = await resolve.json();
    const data = await fetch(`https://opentdb.com/api.php?amount=5&token=${token.token}`);
    const result = await data.json();
    dispatch(getApiQuestionsSuccess(result.results));
    localStorage.setItem('token', JSON.stringify(token));
  }
};
