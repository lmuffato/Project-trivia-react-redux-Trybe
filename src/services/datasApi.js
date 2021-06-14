export function fetchToken() {
  const tokenApi = 'https://opentdb.com/api_token.php?command=request';
  fetch(tokenApi)
    .then((response) => response.json())
    .then((data) => data);
}

export function fetchQuest() {

}
