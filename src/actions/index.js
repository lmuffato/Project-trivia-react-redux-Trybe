export const LOGIN = 'LOGIN';

const login = (name, email) => ({
  type: 'LOGIN',
  name,
  email,
});

export default login;
