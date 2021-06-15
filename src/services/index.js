import { API_TOKEN } from '../constants';
import md5 from 'crypto-js/md5';

export function triviaToken() {
  return fetch(API_TOKEN)
    .then((r) => r.json())
    .then(({ token }) => localStorage.setItem('token', token));
}

/**
 * Para usar a função redirect.call(this, url)
 * @param {string} url url relativa para a qual a aplicação será redirecionada
 *
 */
export function redirect(url) {
  const { history } = this.props;
  history.push(url);
}
