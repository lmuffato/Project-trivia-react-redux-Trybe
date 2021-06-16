import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestQuestionThunk } from '../actions';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();
    this.mockAlternatives = this.mockAlternatives.bind(this);
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

  mockAlternatives() {
    return (
      <>
        <button type="button" data-testid="correct-answer">Loading...</button>
        <button type="button" data-testid="wrong-answer">Loading...</button>
      </>
    );
  }

  render() {
    const { props: { questions }, createAlternativesButtons, mockAlternatives } = this;
    const validQuestions = questions.length > 0;
    return (
      <div>
        <Header />
        <div>
          <p data-testid="question-category">
            {validQuestions ? questions[0].category : 'carregando...'}
          </p>
          <p data-testid="question-text">
            {validQuestions ? questions[0].question : 'carrengando...'}
          </p>
          {validQuestions ? createAlternativesButtons(questions[0]) : mockAlternatives()}
        </div>
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
