export default async function fetchQuestion(token) {
  const { results } = await (await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)).json();
  return results;
}
