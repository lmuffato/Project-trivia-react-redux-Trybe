export const HANDLE_CHANGE_USER = 'HANDLE_CHANGE_USER';

export const handleChangeUser = (name, value) => ({
  type: HANDLE_CHANGE_USER,
  payload: {
    name,
    value,
  },
});
