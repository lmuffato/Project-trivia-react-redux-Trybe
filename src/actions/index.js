import fetchToken from '../services/fetchToken';

export const START_FETCH = 'START_FETCH';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';

function startFetch() {
  return { type: START_FETCH };
}

function fetchSuccess(payload) {
  return {
    type: FETCH_SUCCESS,
    payload,
  };
}

export async function getToken() {
  return async (dispatch) => {
    dispatch(startFetch);
    const token = await fetchToken();
    dispatch(fetchSuccess(token));
  };
}
