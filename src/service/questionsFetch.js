const questionsFetch = async (token) => {
  const url = `https://opentdb.com/api.php?amount=5&token=${token}&encode=url3986`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.results);
  return data.results;
};

export default questionsFetch;
