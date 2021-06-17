import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../pages/game.module.css';
import Loading from './Loading';
import './questions.css';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsIndex: 0,
      isVisible: 'false',
      borderColor: [],
    };
    this.handleClickAnswer = this.handleClickAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
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
    this.setState({ isVisible: 'true' });
  }

  nextQuestion(NumberOfQuestions) {
    this.setState((prevState) => ({
      questionsIndex: (prevState.questionsIndex + 1) % NumberOfQuestions,
      isVisible: 'false',
      borderColor: [],
    }));

    const alternatives = Array.from(
      document.getElementsByClassName(
        styles.question__alternatives,
      ),
    );
    alternatives.forEach((alternative) => {
      alternative.classList.remove(
        'question__alternatives__incorrect',
        'question__alternatives__correct',
      );
    });
  }

  render() {
    const { isVisible, questionsIndex, borderColor } = this.state;
    const { loading, questions } = this.props;
    const questionsFiltered = questions[questionsIndex];
    if (loading || questions.length < 1) {
      return <Loading />;
    }
    return (
      <div>
        <div>
          <h2 data-testid="question-category">{questionsFiltered.category}</h2>
          <p data-testid="question-text">{questionsFiltered.question}</p>
        </div>

        <div className={ styles.question__card }>
          {questionsFiltered.alternatives.map((question, index) => (
            <button
              key={ index }
              onClick={ this.handleClickAnswer }
              type="button"
              className={ [styles
                .question__alternatives, borderColor[index]].join(' ') }
              data-testid={ Object.values(question) }
            >
              {Object.keys(question)}
            </button>
          ))}
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
