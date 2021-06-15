import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../pages/game.module.css';

export default class Questions extends Component {
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
              <li
                data-testid={ Object.values(question) }
                key={ index }
              >
                {Object.keys(question)}
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
