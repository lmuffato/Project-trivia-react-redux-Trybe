const questionsFetch = async (token) => {
  const { results } = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`).json();
  return results;
};

export default questionsFetch;
