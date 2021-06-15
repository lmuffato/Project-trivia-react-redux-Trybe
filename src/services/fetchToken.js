const fetchToken = () => (
  new Promise((resolve) => {
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((result) => {
        result.json().then((data) => {
          resolve(data);
        });
      });
  })
);

export default fetchToken;
