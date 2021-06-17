export const LOGIN = 'LOGIN';
export const TIME = 'TIME';
// export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';
// export const RECEIVE_TRIVIA = 'RECEIVE_TRIVIA';
// export const REQUEST_TRIVIA = 'REQUEST_TRIVIA';

export const login = (payload) => ({ type: LOGIN, payload });

export const time = (payload) => ({ type: TIME, payload });

// const receiveToken = (token) => ({ type: RECEIVE_TOKEN, token });

// export function dataToken(token) {
//   return async (dispatch) => {
//     delete token.response_code;
//     delete token.response_message;
//     dispatch(receiveToken(token));
//   };
// }

// const requestTrivia = () => ({ type: REQUEST_TRIVIA });
// const receiveTrivia = (trivia) => ({ type: RECEIVE_TRIVIA, trivia });

// export function dataTrivia(trivia, token) {
//   return async (dispatch) => {
//     dispatch(requestTrivia());
//     const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
//     const data = await response.json();
//     return data;
//   };
// }
