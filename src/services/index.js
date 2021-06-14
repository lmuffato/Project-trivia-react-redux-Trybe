import { API_TOKEN } from '../constants';

function triviaToken() {
  return fetch(API_TOKEN)
    .then((r) => r.json())
    .then(({ token }) => localStorage.setItem('token', token));
}

export function redirect(url) {
  const { history } = this.props;
  history.push(url);
}

export default triviaToken;
