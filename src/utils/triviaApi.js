function getTriviaQuestions() {
  const result = fetch('https://opentdb.com/api.php?amount=5')
    .then((res) => res.json())
    .then((results) => results);
  return result;
}

export default getTriviaQuestions;
