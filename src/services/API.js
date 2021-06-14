// const requestAPI = 'https://opentdb.com/api_token.php?command=request'

const token = () => {
  fetch('https://opentdb.com/api_token.php?command=request')
    .then(response => response.json())
      .then((result) => localStorage.setItem('token', result.token))
};

export default token;