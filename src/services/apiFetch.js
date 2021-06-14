import { API_TOKEN } from '../constants';

function triviaToken() {
  return fetch(API_TOKEN)
    .then((r) => r.json())
    .then(({ token }) => localStorage.setItem('token', token));
}

export default triviaToken;
