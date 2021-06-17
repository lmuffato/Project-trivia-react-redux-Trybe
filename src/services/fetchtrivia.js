// import { connect } from 'react-redux';

// const { token } = this.props;
// const questionsAmount = 5;
// const endpoint = `https://opentdb.com/api.php?amount=${questionsAmount}&token=${token}`;

const fetchTrivia = async (token) => {
  const questionsAmount = 5;
  const endpoint = `https://opentdb.com/api.php?amount=${questionsAmount}&token=${token}`;
  try {
    const fetchQuestions = await fetch(endpoint);
    const responseTrivia = await fetchQuestions.json();
    return responseTrivia;
  } catch (error) { console.error(error); }
};

// const mapStateToProps = (state) => ({
//   token: state.trivia.token,

// });

export default fetchTrivia;
// export default connect(mapStateToProps)(fetchTrivia);
