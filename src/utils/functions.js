const userValidation = (state) => {
  const emailValidator = /^[\S.]+@[a-z]+\.\w{2,3}$/g.test(state.email);
  const userNameMinLength = 2;
  return !(emailValidator && state.user.length > userNameMinLength);
};

export default userValidation;
