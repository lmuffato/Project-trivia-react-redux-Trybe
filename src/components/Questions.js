import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../pages/game.module.css';
import './questions.css';

export default class Questions extends Component {
  constructor(props) {
    super(props);
    this.handleClickAnswer = this.handleClickAnswer.bind(this);
  }

  changeColorBorder(alternatives, dataTestId, className) {
    const regex = new RegExp(dataTestId);
    alternatives.forEach((alternative) => {
      if (regex.test(alternative.getAttribute('data-testid'))) {
        alternative.classList.add(className);
      }
    });
  }

  handleClickAnswer({ target }) {
    const classNameAnswerIncorrect = 'question__alternatives__incorrect';
    const classNameAnswerCorrect = 'question__alternatives__correct';
    const alternatives = Array.from(
      document.getElementsByClassName(
        styles.question__alternatives,
      ),
    );
    const dataTestid = target.getAttribute('data-testid');

    if (dataTestid === 'correct-answer') {
      this.changeColorBorder(alternatives,
        /wrong-answer/gi, classNameAnswerIncorrect);
      target.classList.add(classNameAnswerCorrect);
    }
    if (/wrong-answer/gi.test(dataTestid)) {
      this.changeColorBorder(alternatives,
        /correct-answer/gi, classNameAnswerCorrect);

      this.changeColorBorder(alternatives,
        /wrong-answer/gi, classNameAnswerIncorrect);
    }
    return '';
  }

  render() {
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
                  className={ styles.question__alternatives }
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
