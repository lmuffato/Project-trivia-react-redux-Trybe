async function fetchTrivia(token) {
  // const { token } = this.props;
  const questionsAmount = 5;
  const endpoint = `https://opentdb.com/api.php?amount=${questionsAmount}&token=${token}`;
  try {
    const fetchQuestions = await fetch(endpoint);
    const responseTrivia = await fetchQuestions.json();
    return responseTrivia.results;
  } catch (error) { console.log(error); }
}

export default fetchTrivia;
