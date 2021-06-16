import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../pages/game.module.css';
import './questions.css';

export default class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      borderColor: [],
    };
    this.handleClickAnswer = this.handleClickAnswer.bind(this);
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
  }

  render() {
    const { borderColor } = this.state;
    const { questionsFiltered } = this.props;
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
                >
                  {Object.keys(question)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  questionsFiltered: PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    alternatives: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};
