const fetchQuestion = (token) => (
  new Promise((resolve) => {
    fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((result) => {
        result.json().then((data) => {
          resolve(data);
        });
      });
  })
);

export default fetchQuestion;
