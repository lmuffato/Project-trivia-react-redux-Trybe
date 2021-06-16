import { API_TRIVIA_TOKEN } from '../constants';

export function triviaToken() {
  return fetch(API_TRIVIA_TOKEN)
    .then((response) => response.json())
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
/**
 * Para usar essa função faça uma listagem dos items a serem permutados
 * @param  {...any} things items da lista a ser permutada
 * @returns {Array} uma permutação aleatória para a lista de items fornecida
 */
export function permutate(...things) {
  const items = [...things];
  const permutation = [];
  while (items.length > 0) {
    const randomNumber = Math.floor(Math.random() * items.length);
    permutation.push(items.splice(randomNumber, 1)[0]);
  }
  return permutation;
}
/**
 * Para usar forneça um objeto com as chaves que você quer modificar
 * por exemplo: { user: Xablau }
 * @param {object} obj
 */
export function setLocalStorage(obj) {
  const previousState = JSON.parse(localStorage.getItem('state'));
  localStorage.setItem('state', JSON.stringify({ ...previousState, player: { ...obj } }));
}
/**
 * Forneça a chave que vocẽ quer acessar
 * @param {string} key
 * @returns
 */
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem('state')).player[key];
}
