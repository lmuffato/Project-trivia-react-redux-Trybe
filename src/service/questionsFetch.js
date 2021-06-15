const questionsFetch = async (token) => {
  console.log(token);
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await response.json();
  console.log(data);
  return data.results;
};

export default questionsFetch;
