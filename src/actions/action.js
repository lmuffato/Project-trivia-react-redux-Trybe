import { md5 } from 'crypto-js';
import { LOGIN, API_GRAVATAR, GRAVATARVATAR } from '../constants';

export const login = (payload) => ({ type: LOGIN, payload });

export const gravatarImg = (email) => ({
  type: GRAVATARVATAR,
  payload: API_GRAVATAR(md5(email).toString()),
});
