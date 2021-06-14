export const LOGIN = 'LOGIN';

export function actionLogin(name, email) {
  return ({
    type: LOGIN,
    payload: {
      name, email,
    },
  });
}
