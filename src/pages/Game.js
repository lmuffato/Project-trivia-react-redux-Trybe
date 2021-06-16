import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestQuestionThunk } from '../actions';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();
    this.createAlternativesButtons = this.createAlternativesButtons.bind(this);
  }

  // componentDidMount() {
  //   const { props: { requestQuestions } } = this;
  //   requestQuestions();
  // }

  createAlternativesButtons(question) {
    const altArray = [...question.incorrect_answers, question.correct_answer];
    const randomNumber = 0.5;
    const shuffledAltArray = altArray.sort(() => Math.random() - randomNumber);
    return shuffledAltArray.map((alt, index) => {
      const isCorrect = (alt === question.correct_answer);
      return (
        <button
          key={ index }
          type="button"
          data-testid={ isCorrect ? 'correct-answer' : `wrong-answer-${index}` }
        >
          {alt}
        </button>
      );
    });
  }

  render() {
    const { props: { questions, loading }, createAlternativesButtons } = this;
    return (
      <div>
        <Header />
        {questions.length === 0 ? <p>loading...</p> : (
          <div>
            <p data-testid="question-category">{questions[0].category}</p>
            <p data-testid="question-text">{questions[0].question}</p>
            {createAlternativesButtons(questions[0])}

          </div>
        )}
      </div>
    );
  }
}

const mapSatateToProps = (state) => ({
  questions: state.questions.results,
  loading: state.questions.loading,
});

const mapDispatchToProps = () => (dispatch) => ({
  requestQuestions: () => dispatch(requestQuestionThunk()),
});

Game.propTypes = {
  requestQuestions: PropTypes.func,
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  })),
  loading: PropTypes.bool,
}.isRequired;

export default connect(mapSatateToProps, mapDispatchToProps)(Game);
