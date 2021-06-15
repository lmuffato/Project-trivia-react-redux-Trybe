import { MD5 } from 'crypto-js';

export const token = () => {
  fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((result) => localStorage.setItem('token', result.token));
};

export const emailHash = (usuario, email) => {
  // return console.log(usuario, email)
  const hash = MD5(email).toString();
  const linkGravatar = `https://www.gravatar.com/avatar/${hash}`;
  localStorage.setItem('userImg', linkGravatar);
  localStorage.setItem('usuario', usuario);
  return console.log(localStorage);
};
// export default token;

export const questionAPI = () => {
  fetch('https://opentdb.com/api.php?amount=5&token')
    .then((response) => response.json())
    .then((result) => result);
};
