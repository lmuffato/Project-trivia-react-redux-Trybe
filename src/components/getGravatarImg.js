import md5 from 'crypto-js/md5';

export default function getGravatarImg(email) {
  const hashEmail = md5(email).toString();

  return `https://www.gravatar.com/avatar/${hashEmail}`;
}
