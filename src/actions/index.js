export const setNameAction = (nome) => ({
  type: 'SET_NAME',
  payload: {
    nome,
  },
});

export const setEmailAction = (email) => ({
  type: 'SET_EMAIL',
  payload: {
    email,
  },
});
