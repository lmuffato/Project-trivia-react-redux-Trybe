import md5 from 'crypto-js/md5';

export default (email) => {
  const hash = md5(email);
  const hashConvert = hash.toString();
  const gravatarImg = `https://www.gravatar.com/avatar/${hashConvert}`;
  return gravatarImg;
};
