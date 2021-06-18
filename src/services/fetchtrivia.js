// import { connect } from 'react-redux';
// import { sendTrivia } from '../actions';

// const { token } = this.props;
// const questionsAmount = 5;
// const endpoint = `https://opentdb.com/api.php?amount=${questionsAmount}&token=${token}`;

// const fetchTrivia = async () => {
//   const token = localStorage.getItem('token');
//   const questionsAmount = 5;
//   const endpoint = `https://opentdb.com/api.php?amount=${questionsAmount}&token=${token}`;
//   try {
//     const fetchQuestions = await fetch(endpoint);
//     const responseTrivia = await fetchQuestions.json();
//     return responseTrivia;
//   } catch (error) { console.error(error); }
// };

// // const mapStateToProps = (state) => ({
// //   token: state.trivia.token,
// // });

// const mapDispatchToProps = (dispatch) => ({
//   getTrivia: (trivia) => dispatch(sendTrivia(trivia.results)),
// });

// // export default fetchTrivia;
// export default connect(null, mapDispatchToProps)(fetchTrivia);
