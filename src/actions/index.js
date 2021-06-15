export const USER = 'USER';
export const RANKING = 'RANKING';

export const user = (payload) => ({
  type: 'USER',
  payload,
});

export const ranking = (payload) => ({
  type: 'RANKING',
  payload,
});
