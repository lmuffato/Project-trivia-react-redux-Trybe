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
    permutation.push(items[randomNumber]);
    items.splice(randomNumber, 1);
  }
  return permutation;
}
