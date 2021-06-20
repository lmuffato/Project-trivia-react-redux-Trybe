const questionsFetch = async (parts) => {
  const url = parts.join('');
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
};

export default questionsFetch;
