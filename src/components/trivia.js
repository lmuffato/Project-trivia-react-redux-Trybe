import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTrivia as getTriviaThunk } from '../actions';

class Trivia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trivia: [],
    };
    this.fetchTrivia = this.fetchTrivia.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
  }

  componentDidMount() {
    console.log('Did mount');
    this.fetchTrivia();
  }

  componentDidUpdate() {
    const { getTrivia } = this.props;
    const { trivia } = this.state;
    return trivia.length === 0 ? <span>Loading...</span>
      : (getTrivia(trivia));
  }

  // async fetchTrivia() {
  //   const { token } = this.props;
  //   const questionsAmount = 5;
  //   const endpoint = `https://opentdb.com/api.php?amount=${questionsAmount}&token=${token}`;
  //   try {
  //     const fetchQuestions = await fetch(endpoint);
  //     const responseTrivia = await fetchQuestions.json();
  //     console.log(responseTrivia.results[0].question);
  //     this.setState({
  //       trivia: responseTrivia,
  //     });
  //     return responseTrivia;
  //   } catch (error) { console.log(error); }
  // }

  renderQuestions() {
    const { trivia } = this.state;
    return (
      <div>
        <h1>TESTE</h1>
        <h1 data-testid="question-category">{`Categoria: ${trivia[0].category}`}</h1>
        <h2 data-testid="question-text">{`Questão 1: ${trivia[0].question}`}</h2>
        <button
          type="button"
          data-testid="correct-answer"
        >
          {`${trivia[0].correct_answer}`}
        </button>
        <button
          type="button"
          data-testid="wrong-answer-0"
        >
          {`${trivia[0].incorrect_answers[0]}`}
        </button>
        <button
          type="button"
          data-testid="wrong-answer-1"
        >
          {`${trivia[0].incorrect_answers[1]}`}
        </button>
        <button
          type="button"
          data-testid="wrong-answer-2"
        >
          {`${trivia[0].incorrect_answers[2]}`}
        </button>
      </div>
    );
  }

  render() {
    const { trivia } = this.state;
    // const { trivia } = this.props;
    console.log(trivia[0]);
    return trivia === 0 ? <h1>Loading...</h1>
      : (
        <div>
          <p>Olá mundo!</p>
          { this.renderQuestions() }
        </div>
      );
    /* trivia.length === 0 ? <span>Loading...</span> */
    // : (
    //   <div>
    //     <p>Enxendo a linguiça</p>
    //   </div>
    // );
  }
}

const mapStateToProps = (state) => ({
  token: state.token.token,
  trivia: state.trivia.trivia,
});

// const mapDispatchToProps = (dispatch) => ({
//   getTrivia: (trivia) => dispatch(getTriviaThunk(trivia.results)),
// });

Trivia.propTypes = {
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
