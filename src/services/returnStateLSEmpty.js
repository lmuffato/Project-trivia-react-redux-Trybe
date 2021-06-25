const returnStateLSEmpty = ({ name, email }) => ({
  player: {
    assertions: 0,
    email,
    name,
    score: 0,
  },
});

export default returnStateLSEmpty;
