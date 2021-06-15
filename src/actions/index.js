export const NEW_LOGIN = 'NEW_LOGIN';
export const TOKEN_ACTION = 'TOKEN_ACTION ';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';

export const loginAction = (state) => ({ type: NEW_LOGIN, state });

// export const requestAction = () => ({ type: REQUEST_TOKEN });

// export const tokenAction = (state) => ({ type: REQUEST_TOKEN, state });

// function fetchToken() {
//   api.fetchToken().then(({ token }) => localStorage
//     .setItem('token', JSON.stringify(token)));
//   this.setState({ loggedIn: true });
//   saveLogin(this.state);
// }
