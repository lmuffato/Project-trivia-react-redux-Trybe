import md5 from 'crypto-js/md5';

const getGravatar = (email) => {
  const hashMD5 = md5(email).toString();
  const gravatar = `https://www.gravatar.com/avatar/${hashMD5}`;
  return gravatar;
};

export default getGravatar;
