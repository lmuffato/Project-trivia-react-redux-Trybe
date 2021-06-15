export const apiTrivia = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const json = await response.json();
  const { token } = json;
  return token;
};

export default apiTrivia;

export async function getQuestions(categoria, dificuldade, tipo) {
  const tkn = await apiTrivia();
  const endpoint = `https://opentdb.com/api.php?amount=5&token=${tkn}${categoria}${dificuldade}${tipo}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data.results;
}
