const getToken = 'https://opentdb.com/api_token.php?command=request';
fetch(getToken).then((response) => response.json());
const getQuestion = (token) => fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
  .then((response) => response.json());

export default getQuestion;

export async function fetchGravatar(email) {
  const response = await fetch(`https://www.gravatar.com/avatar/${email}`);
  const blob = await response.blob();
  const objectURL = URL.createObjectURL(blob);
  return objectURL;
}
