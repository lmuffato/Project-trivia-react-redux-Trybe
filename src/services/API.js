import { MD5 } from 'crypto-js';

// export const token = async () => {

// };

export const emailHash = (usuario, email) => {
  const hash = MD5(email).toString();
  const linkGravatar = `https://www.gravatar.com/avatar/${hash}`;
  localStorage.setItem('userImg', linkGravatar);
  localStorage.setItem('usuario', usuario);
};

export const questionAPI = async () => {
  const fetchApiToken = await fetch('https://opentdb.com/api_token.php?command=request');
  const dataToken = await fetchApiToken.json();
  const token = await dataToken.token;
  const fetchApi = await fetch(`https://opentdb.com/api.php?amount=5&type=multiple&token=${token}`);
  const data = await fetchApi.json();
  return data;
};
