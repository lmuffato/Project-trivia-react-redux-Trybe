import md5 from 'crypto-js/md5';

const getUserImg = (email) => {
  const hash = md5(email).toString();
  const fetchApi = `https://www.gravatar.com/avatar/${hash}?s=30&d=retro`;
  return fetchApi;
};

export default getUserImg;
