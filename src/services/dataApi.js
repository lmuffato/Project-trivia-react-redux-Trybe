export const fetchCoins = () => (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json()
      .then(
        (json) => dispatch(acronycCoins(json)),
      ));
};

export default fetchCoins;
