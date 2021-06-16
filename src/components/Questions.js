import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../pages/game.module.css';
import Loading from './Loading';
import Timer from './Timer';
import './questions.css';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      borderColor: [],
      questionsIndex: 0,
      isVisible: 'false',
      reset: false,
      stop: false,
      disabled: false,
    };
    this.handleClickAnswer = this.handleClickAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleZero = this.handleZero.bind(this);
  }

  nextQuestion(NumberOfQuestions) {
    this.setState((prevState) => ({
      questionsIndex: (prevState.questionsIndex + 1) % NumberOfQuestions,
      borderColor: [],
      isVisible: 'false',
      reset: true,
      stop: false,
      disabled: false,
    }));
  }

  handleClickAnswer() {
    const alternatives = Array.from(document
      .getElementsByClassName(styles.question__alternatives));
    const classAnswerCorrect = 'question__alternatives__correct';
    const classAnswerIncorrect = 'question__alternatives__incorrect';
    alternatives.forEach((alternative) => {
      if (/wrong/gi.test(alternative.getAttribute('data-testid'))) {
        this.setState((prevState) => ({
          borderColor: [...prevState.borderColor, classAnswerIncorrect],
        }));
      } else {
        this.setState((prevState) => ({
          borderColor: [...prevState.borderColor, classAnswerCorrect],
        }));
      }
    });
    this.setState({ isVisible: 'true', stop: true, reset: false, disabled: true });
  }

  handleZero() {
    this.handleClickAnswer();
  }

  render() {
    const { borderColor, isVisible, questionsIndex, reset, stop, disabled } = this.state;
    const { loading, questions } = this.props;
    const questionsFiltered = questions[questionsIndex];

    if (loading) {
      return <Loading />;
    }

    return (
      <div>
        <div>
          <h2 data-testid="question-category">{questionsFiltered.category}</h2>
          <p data-testid="question-text">{questionsFiltered.question}</p>
        </div>

        <div className={ styles.question__card }>
          <ul className={ styles.question__list }>
            {questionsFiltered.alternatives.map((question, index) => (
              <li key={ index }>
                <button
                  onClick={ this.handleClickAnswer }
                  type="button"
                  className={ [styles
                    .question__alternatives, borderColor[index]].join(' ') }
                  data-testid={ Object.values(question) }
                  disabled={ disabled }
                >
                  {Object.keys(question)}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          data-testid="btn-next"
          onClick={ () => this.nextQuestion(questions.length) }
          className={
            [styles.question__button, `question__button__${isVisible}`]
              .join(' ')
          }

        >
          Próxima
        </button>
        <Timer reset={ reset } stop={ stop } handleZero={ this.handleZero } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.data,
  loading: state.questionsReducer.loading,
});

export default connect(mapStateToProps)(Questions);

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    alternatives: PropTypes.arrayOf(PropTypes.object),
  })).isRequired,
  loading: PropTypes.bool,
};

Questions.defaultProps = {
  loading: true,
};
